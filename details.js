require('dotenv').config();
var amazon = require('amazon-product-api');
var mysql = require('./database.js')
var client = amazon.createClient({
    awsId: process.env.awsId,
    awsSecret: process.env.awsSecret,
    awsTag: process.env.awsTag
});

exports.send = (keyword, page) => {
    return new Promise(function (resolve, reject) {
        client.itemSearch({
            searchIndex: 'Automotive',
            responseGroup: 'BrowseNodes, ItemAttributes, OfferFull, SalesRank',
            keywords: keyword,
            ItemPage: page,
            Sort: 'salesrank'
        }, function (err, data) {
            if (!err) {
                for (i in data) {
                    if (typeof data[i].ASIN !== 'undefined' && typeof data[i].ItemAttributes !== 'undefined' && typeof data[i].ItemAttributes[0].Title !== 'undefined' && typeof data[i].ItemAttributes[0].Brand !== 'undefined' && typeof data[i].ItemAttributes[0].PartNumber !== 'undefined' && typeof data[i].OfferSummary !== undefined && typeof data[i].SalesRank !== 'undefined' && typeof data[i].OfferSummary[0].LowestNewPrice !== 'undefined' && typeof data[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice !== 'undefined' && typeof data[i].OfferSummary[0].TotalNew !== 'undefined' && typeof data[i].Offers !== 'undefined' && typeof data[i].Offers[0].Offer !== 'undefined' && typeof data[i].Offers[0].Offer[0].Merchant !== 'undefined' && typeof data[i].Offers[0].Offer[0].Merchant[0].Name !== 'undefined' && typeof data[i].BrowseNodes[0].BrowseNode[0].Name !== 'undefined' && typeof data[i].Offers[0].Offer[0].OfferListing !== 'undefined' && typeof data[i].Offers[0].Offer[0].OfferListing[0].IsEligibleForPrime !== 'undefined' && typeof data[i].BrowseNodes[0].BrowseNode !== 'undefined' && typeof data[i].BrowseNodes !== 'undefined' && typeof data[i].OfferSummary !== 'undefined') {
                        console.log("=================================================")
                        console.log(data[i].ASIN[0])
                        console.log(data[i].ItemAttributes[0].Title[0])
                        var title = data[i].ItemAttributes[0].Title[0].replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g,'')
                        console.log(data[i].ItemAttributes[0].Brand[0])
                        var brand = data[i].ItemAttributes[0].Brand[0].replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, '')
                        console.log(data[i].ItemAttributes[0].PartNumber[0])
                        console.log(data[i].SalesRank[0])
                        console.log(data[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0])
                        console.log(data[i].OfferSummary[0].TotalNew[0])
                        console.log(data[i].Offers[0].Offer[0].Merchant[0].Name[0])
                        var merchant = data[i].Offers[0].Offer[0].Merchant[0].Name[0].replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, '')
                        console.log(data[i].BrowseNodes[0].BrowseNode[0].Name[0])
                        console.log(data[i].Offers[0].Offer[0].OfferListing[0].IsEligibleForPrime[0])
                        mysql.insert(data[i].ASIN[0], title, brand, data[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0], data[i].ItemAttributes[0].PartNumber[0], data[i].SalesRank[0], data[i].OfferSummary[0].TotalNew[0], merchant, data[i].BrowseNodes[0].BrowseNode[0].Name[0], data[i].Offers[0].Offer[0].OfferListing[0].IsEligibleForPrime[0])
                    }

                }
                resolve(data)
            } else {
                console.log(err.Error[0].Message)
                resolve(err);
            }
        });
    });
};
