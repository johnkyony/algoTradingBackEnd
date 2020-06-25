import axios from 'axios'



const demoTradeAccountApiUrl = 'https://api-fxpractice.oanda.com/v3/'
const realTradeAccountApiUrl = 'https://api-fxtrade.oanda.com/v3/'
const apiUrl = demoTradeAccountApiUrl
const streamApiUrl = "https://stream-fxtrade.oanda.com/v3/accounts/"
const token = '54e39d6da0d6e2511b6a0930b268c906-4e50438d474c88ab5b223d497a91aca2'
const demoToken = '559cf3288a5edc76c76ee080d130b810-c23454cbc30b4a395a0801a7b00ab581'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + demoToken;
// const config = {
//     headers: {
//         Authorization: 'Bearer ' + token
//     }
// }
const Accounts = {
    allAccounts: async function (){
        //Get a list of all Accounts authorized for the provided token
       
        try {
            let allAccountDetails = await axios.get(apiUrl + 'accounts' )
            
            
            return allAccountDetails.data.accounts
        }catch(err) {
            console.log(err.error)
        }
        
       
        
        // console.log(allAccountDetails.data)
    } , 
    accountDetails : async function (accountID) {
        // Get the full details for a single account that a client has access to
        // Full pending order , open Trade and open position representation provided
        try {
            let accountDetails = await axios.get(apiUrl+ `accounts/${accountID}`)
            
            return accountDetails.data
        }catch(err) {
            console.log(err.error)
        }
        
        
    } , 
    accountDetailsSummary : async function (accountID) {
        //Get a summarry for a single account that a client has access to
        try {
            
            let accountDetailsSummary = await axios.get(apiUrl+ `accounts/${accountID}/summary`)
            return accountDetailsSummary.data

        } catch (err) {
            console.log(err.error)
        }
        
    } , 
    accountInstrumentsDetails: async function (accountID) {
        // Get the list of tradeable instruments for the given account 
        // The list of tradeable instruments is dependent on the regulatory division that the account is located in 
        // Same for all single user accounts
        try{
            let accountsInstrumentsDetails = await axios.get(apiUrl + `accounts/${accountID}/instruments`)
            
            return  accountsInstrumentsDetails.data
        }catch (err){
            console.log(err.error)
        }
        
    }, 
    accountLatestChanges: async function (accountID , sinceTransactionID) {
        // Used to poll an Account for its current state & changes since a specificied TransactionId
        try {
            let accountLatestChanges = await axios.get(apiUrl + `accounts/${accountID}/changes?sinceTransactionID=${sinceTransactionID}`)
            console.log(accountLatestChanges)
            return accountLatestChanges.data

        }catch(err) {
            console.log(err.error)
        }
        
    }
}

const Instruments = {
    instrumentCandles: async function (instrument , startFrom){
        // Fetch candle stick data for an instrument
        try{
            let instrumentCandles = await axios.get(apiUrl + `instruments/${instrument}/candles?count=10&price=A&from=2016-01-01T00%3A00%3A00.000000000Z&granularity=D`)
            console.log(instrumentCandles.data)
            return instrumentCandles.data

        }catch(err){
            console.log(err.error)
        }
        
    }, 
    instrumentOrderBook: async function (instrument) {
        // Fetch an order book for an instrument 
        try{
            let instrumentOrderBook = await axios.get(apiUrl + `instruments/${instrument}/orderBook`)
            
            return instrumentOrderBook.data
        }catch(err){
            console.log(err.error)
        }
        
    }, 
    instrumentPositionBook: async function (instrument) {
        // Fetch a position book for an instrument 
        try{
            let instrumentPositionBook = await axios.get(apiUrl + `instruments/${instrument}/positionBook`)
            return instrumentPositionBook.data
        }catch(err){
            console.log(err.error)
        }
        
    }
}

const Orders = {
    createNewOrder: async function (accountID , units , instrument , timeInforce , type , positionFill , price) {
        // Create an Order for an Account 
        try {
            
            console.log('creating new order')
            console.log('==================')
            console.log(`Account Id: ${accountID} \n units: ${units} \n instrument: ${instrument} \n timeInforce: ${timeInforce} \n type: ${type} \n positionFill : ${positionFill} \n price: ${price}`)
            let newOrder = await axios.post(apiUrl + `accounts/${accountID}/orders` , {
                "order" : {
                    "units" : units , 
                    "instrument": instrument , 
                    "timeInForce": timeInforce, 
                    "type": type , 
                    "positionFill": positionFill,
                    "price": price
                }
               
            })
            console.log('===================')
            console.log(newOrder.data)
            console.log('===================')
            return newOrder.data
            
        } catch (error) {
            console.log(error.error)
        }
        
       
    } , 
    allAccountOrders: async function(accountID){
        // Get a list of Orders for an Account 
        try {
            let allOrders = await axios.get(apiUrl + `accounts/${accountID}/orders`)
            return allOrders.data
        } catch (error) {
            console.log(error.error)
        }
        
        

    } , 
    allPendingOrders: async function(accountID){
        // List all pending Orders in an Account
        try {
            let allPendingOrders = await axios.get(apiUrl + `accounts/${accountID}/pendingOrders`)
            return allPendingOrders.data

        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    orderDetail: async function(accountID , orderSpecifier) {
        // Get details for a single Order in an Account 
        try {
            let orderDetail = await axios.get(apiUrl + `accounts/${accountID}/orders/${orderSpecifier}`)
            return orderDetail.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    orderCancel: async function (accountID , orderSpecifier){
        // Cancel a pending Order in an Account 
        try {
            console.log("==============")
            console.log("canceling order: \t" + orderSpecifier)
            console.log("==============")
            let orderCancel = await axios.put(apiUrl + `accounts/${accountID}/orders/${orderSpecifier}/cancel`)
            console.log(orderCancel.data)
            console.log("==============")
            return orderCancel.data
        } catch (error) {
            console.log(error.error)
        }
        
    }
}

const Trades = {
    allTrades : async function (accountID){
        // Get a list of Trades for an Account 
        try {
            let allTrades = await axios.get(apiUrl + `accounts/${accountID}/trades`)
            return allTrades.data

        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    allOpenTrades : async function (accountID){
        // Get a list of open trades for an account 
        try {
            let allOpenTrades = await axios.get(apiUrl + `accounts/${accountID}/openTrades`)
            return allOpenTrades.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    tradeDetails : async function (accountID , tradeSpecifier){
        // Get the details of a specific trade in an Account
        try {
            let tradeDetails = await axios.get(apiUrl + `accounts/${accountID}/trades/${tradeSpecifier}`)
            return tradeDetails.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    closeTrade: async function (accountID ,  tradeSpecifier) {
        // Close (partially or fully) a specific open trade in an Account
        try {
            console.log("==========")
            console.log("Closing Trade with id: \t" + tradeSpecifier)
            console.log("===========")
            let closeTrade = await axios.put(apiUrl + `accounts/${accountID}/trades/${tradeSpecifier}/close`)
            console.log(closeTrade.data.orderFillTransaction)
            console.log("==============")
            return closeTrade.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    trailingStopOnTrades: async function (accountID , tradeSpecifier , takeProfitPrice , stopLossPrice , timeInForce) {
        // Create , replace and cancel a Trade's dependent Orders
        //  ( Take Profit , Stop Loss and Trailing Stop Loss) 
        // Through a trade itself 
        try {
            let trailingStopOnTrades = await axios.put(apiUrl + `accounts/${accountID}/trades/${tradeSpecifier}/orders` , {
                "takeProfit" : {
                    "timeInForce": timeInForce , 
                    "price": takeProfitPrice
                }, 
                "stopLoss": {
                    "timeInForce": timeInForce, 
                    "price": stopLossPrice
                }
            })
            return trailingStopOnTrades.data
        } catch (error) {
            console.log(error.error)
        }
        
        
    }
}

const Positions = {
    allPositions: async function (accountID){
        // List all positions for an account . 
        //The positions returned are for every instrument 
        // that has had a position during the lifetime of an account 
        try {
            let allPositions = await axios.get(apiUrl + `accounts/${accountID}/positions`)
            return allPositions.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    allOpenPositions: async function (accountID){
        //List all open Positions for an Account . an open Position
        // is a Position in an Account that currently has a trade opened for it.
        try {
            let allOpenPositions = await axios.get(apiUrl + `accounts/${accountID}/openPositions`)
            return allOpenPositions.data
        } catch (error) {
            console.log(error.error)
        }
       
    } , 
    singlePositionDetails: async function (accountID , instrument) {
        // Get the details of a single Instrument's Position 
        // in an Account . The position may by open or not. 
        try {
            let singlePositionDetails = await axios.get(apiUrl + `accounts/${accountID}/positions/${instrument}`)
            return singlePositionDetails.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    closeSinglePosition: async function (accountID , instrument , longUnits){
        // close out the open Position for a specific instrument in an Account 
        try {
            let closeSinglePosition = await axios.put(apiUrl + `accounts/${accountID}/positions/${instrument}/close`, {
                "longUnits": longUnits
            })
            return closeSinglePosition.data
        } catch (error) {
            console.log(error.error)
        }
        
        
    }
}

const Transactions = {
    allTransactions: async function (accountID) {
        // Get a list of Transactions pages that satisfy a time-based Transation query
        try {
            let allTransactions = await axios.get(apiUrl + `accounts/${accountID}/transactions`)
            return allTransactions
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    singleAccountTransactionDetails: async function (accountID , transactionID){
        // Get the details of a single Acccount Transaction 
        try {
            let singleAccountTransactionDetails = await axios.get(apiUrl + `accounts/${accountID}/transactions/${transactionID}`)
            return singleAccountTransactionDetails.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    searchTransactionsByIDRange: async function (accountID , idRangeFrom , idRangeTo){
        // Get a rand of Transactions for an Account based on the transaction ids
        try {
            let searchTransactionsByIDRange = await axios.get(apiUrl + `accounts/${accountID}/transactions/idrange?to=${idRangeTo}&from=${idRangeFrom}`)
            return searchTransactionsByIDRange.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    searchTransactionStartingFromSpecificID: async function (accountID , transactionID) {
        // Get a range of Transactions for an Account starting at (but not including) a provided transaction Id
        try {
            let searchTransactionStartingFromSpecificID = await axios.get(apiUrl + `accounts/${accountID}/transactions/${transactionID}`)
            return searchTransactionStartingFromSpecificID.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    streamLatestTransactions: async function (accountID) {
        // Get a Stream of Transactions for an Account starting from when 
        //the request is made NB Streaming End point 
        try {
            let streamLatestTransactions = await axios({
                method: 'get' , 
                url : streamApiUrl + `${accountID}/transactions/stream`,
                responseType: 'stream',
                 config
    
            })
            return streamLatestTransactions.data
        } catch (error) {
            console.log(error.error)
        }
        
        

    }
}

const Pricings = { 
    latestCandlesResult: async function (accountID) {
        //Get dancing bears and most recently completed candles within and 
        // Account for speciied combinations of instruement , 
        //granualarity , and price component 
        try {
            let latestCandlesResult = await axios.get(apiUrl + `accounts/${accountID}/candles/latest`)
            return latestCandlesResult.data
        } catch (error) {
            console.log(error.error)
        }
        
    }, 
    specificPricingDetails: async function (accountID) {
        // Get pricing information for a specified list of instruments within an account 
        try {
            let specificPricingDetails = await axios.get(apiUrl + `accounts/${accountID}/pricing`)
            return specificPricingDetails.data
        } catch (error) {
            console.log(error.error)
        }
        
    } , 
    pricingStream: async function (accountID) {
        // Get a stream of Account Prices starting from when the request is made. 
        // This pricing stream does not include every single price created for the account ,
        // Instead will provide at most 4 prices per second (every 250 milliseconds) for each instruments requested
        // if > 1 price is created for an instrument during 250 millisecond window , only price in effect at the end of the window is sent
        // This means that during periods of rapid movement , you will not see every price , depending on when you connected you shall see different prices
        try {
            let pricingStream = await axios({
                method: 'get' ,
                url : streamApiUrl + `${accountID}/pricing/stream`,
                responseType: 'stream', 
                config
            })
            return pricingStream.data
        } catch (error) {
            console.log(error.error)
        }
        
        
    } , 
    fetchInstrumentCandleResults: async function (accountID , instrument) {
        // Fetch Candlestick data for an instrument 
        try {
            let fetchInstrumentCandleResults = await axios.get(apiUrl + `accounts/${accountID}/instruments/${instrument}/candles`)
            return fetchInstrumentCandleResults.data
        } catch (error) {
            console.log(error.error)
        }
        
    }

}

export default  {
    Accounts,
    Instruments, 
    Orders,
    Trades,
    Positions,
    Pricings
}