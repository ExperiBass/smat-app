///////////////////////////////////////////////////////////////////////
//    ____  _                    _   _ _              _       _ _    //
//   / ___|| | __ ___   ____ _  | | | | | ___ __ __ _(_)_ __ (_) |   //
//   \___ \| |/ _` \ \ / / _` | | | | | |/ / '__/ _` | | '_ \| | |   //
//    ___) | | (_| |\ V / (_| | | |_| |   <| | | (_| | | | | | |_|   //
//   |____/|_|\__,_| \_/ \__,_|  \___/|_|\_\_|  \__,_|_|_| |_|_(_)   //
//                                                                   //
///////////////////////////////////////////////////////////////////////

const {makeRequest} = require('./utilityMethods')

const CONSTANTS = {
    siteOptions: [
        "rumble_video",
        "rumble_content",
        "bitchute_video",
        "bitchute_content",
        "lbry_video",
        "lbry_content",
        "8kun",
        "4chan",
        "gab",
        "parler",
        "win",
        "poal",
        "telegram",
        "kiwifarms",
        "gettr",
        "wimkin",
        "mewe",
        "minds"
    ],
    timestampRegex: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}/i
}
module.exports = {
    /**
     * Retrieve a list of post objects.
     * @url https://api.smat-app.com/docs#
     * @param {String} searchTerm Term to search for.
     * @param {Number} limit The maximum number of objects to receive. Defaults to 10.
     * @param {String} site The site to search.
     * Options:
     * rumble_video
     * rumble_content
     * bitchute_video
     * bitchute_content
     * lbry_video
     * lbry_content
     * 8kun
     * 4chan
     * gab
     * parler
     * win
     * poal
     * telegram
     * kiwifarms
     * gettr
     * wimkin
     * mewe
     * minds
     * @param {String} since Beginning of the date range to search. Timestamp in ISO-8601 format.
     * @param {String} until End if the date range to search. Timestamp in ISO-8601 format.
     * @param {Boolean} esquery Unknown. Defaults to false.
     * @param {Boolean} sortDescending Whether to sort by decending or ascending. Defaults to false.
     */
    getContent(searchTerm, limit = 10, site, since, until, esquery = false, sortDescending = false) {

        // Check for valid arguments
        if (typeof searchTerm !== "string") {
            throw Error(`Argument "searchTerm" of "getContent()" must be a string.`)
        }
        if (typeof limit !== "number" || isNaN(limit)) {
            throw Error(`Argument "limit" of "getContent()" is not a number.`)
        }
        if (typeof site !== "string" || !CONSTANTS.siteOptions.find(site)) {
            throw Error(`Argument "site" of "getContent()" is either not a string or not one of the valid options.`)
        }
        if (typeof since !== "string" || !CONSTANTS.timestampRegex.test(since)) {
            throw Error(`Argument "since" of "getContent()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof until !== "string" || !CONSTANTS.timestampRegex.test(until)) {
            throw Error(`Argument "until" of "getContent()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof esquery !== "boolean") {
            throw Error(`Argument "esquery" of "getContent()" is not a boolean value.`)
        }
        if (typeof sortDescending !== "boolean") {
            throw Error(`Argument "sortDescending" of "getContent()" is not a boolean value.`)
        }

        // Build the request and return it
        return makeRequest({
            subUrl: `/content`,
            query: {
                term: searchTerm,
                limit: limit,
                site: site,
                since: since,
                until: until,
                esquery: esquery,
                sortdesc: sortDescending
            }
        })
    },
    /**
     * Retrieve a time series.
     * @param {String} searchTerm Term to search for.
     * @param {String} interval 
     * @param {String} site The site to search.
     * Options:
     * rumble_video
     * rumble_content
     * bitchute_video
     * bitchute_content
     * lbry_video
     * lbry_content
     * 8kun
     * 4chan
     * gab
     * parler
     * win
     * poal
     * telegram
     * kiwifarms
     * gettr
     * wimkin
     * mewe
     * minds
     * @param {String} since Beginning of the date range to search. Timestamp in ISO-8601 format.
     * @param {String} until End if the date range to search. Timestamp in ISO-8601 format.
     * @param {Boolean} changepoint Unknown, Defaults to false.
     * @param {Boolean} esquery Unknown. Defaults to false.
     */
    getTimeseries(searchTerm, interval = "day", site, since, until, changepoint = false, esquery = false) {
        // Check for valid arguments
        if (typeof searchTerm !== "string") {
            throw Error(`Argument "searchTerm" of "getTimeseries()" must be a string.`)
        }
        if (typeof interval !== "string") {
            throw Error(`Argument "interval" of "getTimeseries()" is not a string.`)
        }
        if (typeof site !== "string" || !CONSTANTS.siteOptions.find(site)) {
            throw Error(`Argument "site" of "getTimeseries()" is either not a string or not one of the valid options.`)
        }
        if (typeof since !== "string" || !CONSTANTS.timestampRegex.test(since)) {
            throw Error(`Argument "since" of "getTimeseries()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof until !== "string" || !CONSTANTS.timestampRegex.test(until)) {
            throw Error(`Argument "until" of "getTimeseries()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof esquery !== "boolean") {
            throw Error(`Argument "esquery" of "getTimeseries()" is not a boolean value.`)
        }
        if (typeof changepoint !== "boolean") {
            throw Error(`Argument "changepoint" of "getTimeseries()" is not a boolean value.`)
        }

        return makeRequest({
            subUrl: "/timeseries",
            query: {
                term: searchTerm,
                interval: interval,
                site: site,
                since: since,
                until: until,
                changepoint: changepoint,
                esquery: esquery
            }
        })
    },
    getActivity(searchTerm, aggBy, site, since, until, esquery = false) {
        // Check for valid arguments
        if (typeof searchTerm !== "string") {
            throw Error(`Argument "searchTerm" of "getActivity()" must be a string.`)
        }
        if (typeof aggBy !== "string") {
            throw Error(`Argument "aggBy" of "getActivity()" is not a string.`)
        }
        if (typeof site !== "string" || !CONSTANTS.siteOptions.find(site)) {
            throw Error(`Argument "site" of "getActivity()" is either not a string or not one of the valid options.`)
        }
        if (typeof since !== "string" || !CONSTANTS.timestampRegex.test(since)) {
            throw Error(`Argument "since" of "getActivity()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof until !== "string" || !CONSTANTS.timestampRegex.test(until)) {
            throw Error(`Argument "until" of "getActivity()" is either not a string or not a ISO-8601 formatted date.`)
        }
        if (typeof esquery !== "boolean") {
            throw Error(`Argument "esquery" of "getActivity()" is not a boolean value.`)
        }
        return makeRequest({
            subUrl: "/activity",
            query: {
                term: searchTerm,
                agg_by: aggBy,
                site: site,
                since: since,
                until: until,
                esquery: esquery
            }
        })
    }
}