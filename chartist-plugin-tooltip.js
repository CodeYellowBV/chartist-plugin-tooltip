(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['chartist'], function (chartist, jquery) {
            return (root.returnExportsGlobal = factory(chartist));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('chartist'));
    } else {
        root['Chartist.plugins.tooltip'] = factory(root.chartist);
    }
}(this, function (Chartist, $) {

    /**
     * This Chartist tooltip plugin is a modified version of
     * https://github.com/Globegitter/chartist-plugin-tooltip.
     *
     */
    'use strict';

    var defaultOptions = {
        valueTransform: Chartist.noop,
        seriesName: true // Show name of series in tooltip.
    };

    Chartist.plugins = Chartist.plugins || {};

    Chartist.plugins.tooltip = function (options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function tooltip(chart) {
        var chart = chart.container;
        chart.innerHTML = '<div class="ct-tooltip"></div>';
        var toolTip = document.getElementsByClassName('ct-tooltip')[0];

        toolTip.style.display = 'none';
        toolTip.style.position = 'absolute';

        chart.addEventListener('mouseover', e => {
          toolTip.innerHTML = e.target.getAttribute('ct:value');
          !toolTip.innerHTML ? toolTip.style.display = 'none' : toolTip.style.display = 'block';
          toolTip.style.left = e.layerX - toolTip.clientWidth / 2  + 'px';
          toolTip.style.top =  e.layerY - toolTip.clientHeight - 15 + 'px';
        }, false);

        chart.addEventListener('mouseleave',  e => {
          toolTip.style.display = 'none';
          toolTip.innerHTML = '';
        }, false);

        chart.addEventListener('mousemove',  e => {
          toolTip.style.left = e.layerX - toolTip.clientWidth / 2  + 'px';
          toolTip.style.top =  e.layerY - toolTip.clientHeight - 15 + 'px';
        }, false);

      }

    };

    return Chartist.plugins.tooltip;

}));
