/**
 * Utility for configuring Tracekit
 *
 *    // Configure with a url which will receive error reports
 *    if (TracekitConfig) {
 *        TracekitConfig.setUrl('http://tracekit-dev.sandbox01.jarv.us/api/catch');
 *    }
 *
 *    // errors that occur in try blocks have full stack information
 *    try {
 *        //non_existent_function();
 *    } catch (e) {
 *        //error with stack trace gets normalized and sent to subscriber
 *        TraceKit.report(e);
 *    }
 *
 *    // errors outside of try blocks do not have full stack info
 *    non_existent_function();
 */
Ext.define('Jarvus.util.TracekitConfig', {
    alternateClassName: 'TracekitConfig',
    singleton: true,

    config: {
        url: null,
        appName: null
    },

    constructor: function() {
        var me = this;

        if (window.TraceKit)
        {
            TraceKit.report.subscribe(Ext.bind(me.sendReport,me));
        }
        else
        {
            console.warn('TraceKit library was not found.  Tracekit was not configured.');
        }

    },

    sendReport: function(errorReport)
    {
        var me = this;

        Ext.Ajax.request({
            url: me.getUrl(),
            params: {
                app_name: me.getAppName(),
                error: JSON.stringify(errorReport)
            },
            success: function(response){
            }
        });
    }

});
