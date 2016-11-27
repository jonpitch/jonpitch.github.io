---
layout: post
title: Put Some Fiber in Your Dump
medium: https://medium.com/@jonpitch/put-some-fiber-in-your-dump-b15d9c9283fa
tags: [codeception, devops, testing]
---

First, if you're a software developer and not writing tests, please either start immediately or quit your job forever.

***Update June 20th, 2015:*** This extension is now available on [Github](https://www.github.com/jonpitch/laxative) and via [Composer](https://packagist.org/packages/jonpitch/laxative)

[Codeception](http://www.codeception.com) is a testing framework that I have used over the years with much success. I think it does a great job of being extensible and most importantly, tests are easy to write. However, regardless of its ease of use, eventually you'll wind up working with data, which can be a huge pain in the ass. There's a [Db module](http://codeception.com/docs/modules/Db) for Codeception that makes this mostly painless to deal with. Here's how it works:

* You dump your database to a file
* Before your test runs, your database is restored from the dump file.
* Your test runs
* After your test finishes, that data is torn down

This is great, most of the time. Where I found this to fall down is on a team of several developers with an actively changing data model. It's very easy for migrations, or new features to either not make their way in to the dump file or just the data dump starts to drift with test data.

One way of alleviating this problem is to have your database literally start from scratch every time you run tests. The solution for my team was to create a [Codeception extension](http://codeception.com/docs/08-Customization#Extension-classes). The goal here is to listen on the `before.suite` and `after.suite` events (the earliest and latest events in the chain that we can attach to), where we do the following:

* Backup our local database - if we want to
* Restore our database from a very bare bones dump - basically just an empty database
* Run all of our database migrations
* Run any data seeding code
* Create a new dump file for the tests to use
* Re-configure Codeception to use this dump

Here's what this looks like in code. Note, this is [Laravel](http://laravel.com/) specific and some things are hard-coded for demonstration:

{% highlight php startinline=true %}
class MySuperSweetExtension extends \Codeception\Platform\Extension
{
  // listen to these events
  public static $events = array(
    'suite.before' => 'beforeSuite',
    'suite.after' => 'afterSuite',
  );

  private $_backup;
  private $_backupPath;
  private $_host;
  private $_login;
  private $_database;

  // the Codeception Db module
  private $_db;

  public function beforeSuite(\Codeception\Event\SuiteEvent $e)
  {
    // read config
    $this->_backup = $this->config['backup'];
    $this->_backupPath = $this->config['backup_path'];
    $this->_host = $this->config['host'];
    $this->_login = $this->config['login'];
    $this->_database = $this->config['database'];

    // get the db module
      try {
        $this->_db = $this->getModule('Db');
      } catch (\Exception $e) {
        return;
      }

    // back up local database if enabled
    if ($this->_backup) {
      $this->backup();
    }

    // start from scratch
    $this->localRestore();

    // run migrations
    $this->migrate();

    // run seeder(s)
    $this->seed();

    // create Codeception dump
    $this->dump();

    // update Codeception to populate the database
    $this->updateDbModule();
  }

  public function afterSuite(\Codeception\Event\SuiteEvent $e)
  {
    // read config
    $this->_backup = $this->config['backup'];
    $this->_backupPath = $this->config['backup_path'];

    if ($this->_backup) {
      $this->restore();
    }
  }

  // Create a binary back up of the local database.
  private function backup()
  {
    $this->writeln('Backing up your local database to: ' . $this->_backupPath . '...');

    // use pg_dump to create binary backup
    $command = sprintf('pg_dump -h %s -U %s -d %s -F t --file %s',
      $this->_host,
      $this->_login,
      $this->_database,
      $this->_backupPath);

    exec($command);

    $this->writeln('Done.');
  }

  // Let Codeception restore the database from base.sql
  private function localRestore()
  {
    $this->writeln('Restoring local database from base...');

    $this->_db->_reconfigure(array('populate' => true));
    $this->_db->_initialize();

    $this->writeln('Done.');
  }

  // Restore local database from a binary backup.
  private function restore()
  {
    // get the db module - not needed but will prevent restore for
    // suites that don't use Db
      try {
        $this->_db = $this->getModule('Db');
      } catch (\Exception $e) {
        return;
      }

    $this->writeln('Restoring your database from backup...');

    // use pg_restore to restore from our binary backup
    $command = sprintf('pg_restore -h %s -U %s -d %s -c %s',
      $this->_host,
      'postgres',
      $this->_database,
      $this->_backupPath);

    exec($command);

    $this->writeln('Done.');
  }

  // Run all migrations against fresh database.
  private function migrate()
  {
    $this->writeln('Running migrations...');

    $command = 'php artisan migrate';
    exec($command);

    $this->writeln('Done.');
  }

  // Run all seeders against newly created database.
  private function seed()
  {
    $this->writeln('Seeding database...');

    $command = 'php artisan db:seed';
    exec($command);

    $this->writeln('Done.');
  }

  // Create a dump file for the Codeception Db module.
  private function dump()
  {
    $this->writeln('Creating codeception dump...');

    $command = sprintf('pg_dump -h %s -U %s -d %s > tests/_data/dump.sql',
      $this->_host,
      $this->_login,
      $this->_database);

    exec($command);

    $this->writeln('Done.');
  }

  // Re-configure the Db module to ensure we populate from the dump file.
  private function updateDbModule()
  {
    $this->writeln('Re-configuring Codeception Db module...');

    $this->_db->_reconfigure(array('dump' => 'tests/_data/dump.sql'));
    $this->_db->_initialize();

    $this->writeln('Done.');
  }
}
{% endhighlight %}

The biggest benefit with this extension in my opinion is that developers never have to worry about maintaining the dump file. The codebase becomes the "authoritative" source of data. So as developers create new migrations, update the data model, etc. the dump is always in sync.

However there is one major assumption made with this approach:

* Any setup data for tests is either taken care of in the test themselves or in some seeding mechanism.

I don't think this is a big deal. It makes us write tests in isolation and more importantly, developers are just focusing on delivering features and testing those features. There's no lost time debugging broken dump files.
