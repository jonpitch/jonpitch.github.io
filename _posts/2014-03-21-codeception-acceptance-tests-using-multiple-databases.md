---
layout: post
title: Codeception Acceptance Tests - Using Multiple Databases
---

[Codeception](http://codeception.com/) is a great PHP testing framework and I would highly recommend it to anyone that needs functional, unit or acceptance testing, even if your application isn't PHP based. Not only does it give you a lot out of the box, but it's very modular and extensible.

One of the most commonly used Codeception modules is the [Db](http://codeception.com/docs/modules/Db) module. The idea with the Db module is that you create a dump of your database, then before each scenario your database is rebuilt from the dump and after the scenario your database is cleaned up. This is great for testing because each of your tests can be data independent and stand by themselves.

The only downside with the Db module is that it is meant to work in your traditional web application, meaning you have a web application and one database. But what if you are building a web application that instead of having a traditional database of its own, communicates with several web services and relies on those services for data? Assuming of course that these web services are your own and under your control, Codeception has you covered (that's a software testing pun for those keeping score at home).

We can actually accomplish this fairly easily by using Codeception [Extension Classes](http://codeception.com/docs/08-Customization#Extension-classes). What we'll be doing with Extensions is as follows:

* Hook into the "before test" and "after test" events with our Extension
* Reconfigure the Db module to point to our web service, re-initialize the module and execute
  * Repeat for each web service

To get started, we need to first enable the Db module in our Acceptance tests. Follow the [instructions](http://codeception.com/docs/modules/Db#Config) to setup the Db module. What's important here is that we set `populate` and `cleanup` to false and that `dump` points to a valid file. We set populate and cleanup to false because we don't want the Db module populating and cleaning up after each test. Well, we kind of do, but by default the Db module only communicates with one database where we need multiple.

Second, follow the [instructions](http://codeception.com/docs/08-Customization#Extension-classes) for creating a basic Codeception Extension. After you have setup your class, configured and included it in your bootstrap, you can use the following code as a guide:

{% highlight php %}
class YourExtensionClass extends \Codeception\Platform\Extension {

    // events to listen on
    static $events = array(
        'test.before' => 'beforeTest',
        'test.after' => 'afterTest',
    );

    function beforeTest(\CodeCeption\Event\Test $e)
    {
        // get the test and groups
        $test = $e->getTest();
        $groups = $test->getScenario()->getGroups();

        // only restore if annotated to do so
        if (in_array('api', $groups)) {
            // get the Db module
            $db = $this->getModule('Db');

            // re-initialize with web service one api config and execute
            $webserviceOneConfig = $this->getWebServiceOneConfig($this->config);
            $db->_reconfigure($webserviceOneConfig);
            $db->_initialize();
            $db->_before($test);

            // re-initialize with web service two api config and execute
            $webserviceTwoConfig = $this->getWebServiceTwoConfig($this->config);
            $db->_reconfigure($webserviceTwoConfig);
            $db->_initialize();
            $db->_before($test);
        }
    }

    function afterTest(\CodeCeption\Event\Test $e)
    {
        // get the test and groups
        $test = $e->getTest();
        $groups = $test->getScenario()->getGroups();

        // only restore if annotated to do so
        if (in_array('api', $groups)) {
            // get the Db module
            $db = $this->getModule('Db');

            // re-initialize with web service one api config and execute
            $webserviceOneConfig = $this->getWebServiceOneConfig($this->config);
            $db->_reconfigure($webserviceOneConfig);
            $db->_initialize();
            $db->_after($test);

            // re-initialize with web service two api config and execute
            $webserviceTwoConfig = $this->getWebServiceTwoConfig($this->config);
            $db->_reconfigure($webserviceTwoConfig);
            $db->_initialize();
            $db->_after($test);
        }
    }

    private function getWebServiceOneConfig($config)
    {
        return array(
            'dsn' => 'your first webservice db dsn',
            'dump' => '/path/to/your/first/dump/file',
            'populate' => true,
            'cleanup' => true,
        );
    }

    private function getWebServiceTwoConfig($config)
    {
        return array(
            'dsn' => 'your second webservice db dsn',
            'dump' => '/path/to/your/second/dump/file',
            'populate' => true,
            'cleanup' => true,
    );
}
{% endhighlight %}

If have my extension setup to only fire if a given test is annotated properly, which is:

{% highlight php %}
// in a Cest
/**
 * @group api
 */
public function hereIsSomeTest(WebGuy $I)
{
...
}

// in a Cept
$scenario->group('api');
$I = new WebGuy($scenario);
{% endhighlight %}

I setup the extension to adhere to the "api" annotation so I didn't have to setup and tear down my API databases on every single test, only those that deal with data. However, you could very easily modify to suit your needs.
