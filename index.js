import express from 'express'
import cors from 'cors'
import oanda from './BrokerPlatforms/oandaPlatform.js'
import bodyParser from 'body-parser'

const app = express ()

app.use(cors())
// parse application/json 
app.use(bodyParser.json())
// Accounts End Points
app.get('/accounts/allAccounts' , async (req , res) => {
    try {
        let allAccounts = await oanda.Accounts.allAccounts()
        res.send(allAccounts)
        
    }catch(err) {
        console.log(err.error)
    }

})

app.get('/accounts/:accountID/accountDetails' , async (req, res) => {
    try {
        let accountDetails = await oanda.Accounts.accountDetails(req.params.accountID)
        res.send(accountDetails)

    } catch (err) {
        console.log(err.error)
    }
   
  
})


app.get('/accounts/:accountID/accountDetailsSummary' , async (req , res) => {
    try {
        
       let accountDetailsSummary = await oanda.Accounts.accountDetailsSummary(req.params.accountID)
       res.send(accountDetailsSummary)
    }catch(err) {
        console.log(err.error)
    }
    
})

app.get('/accounts/:accountID/accountInstrumentsDetails' , async (req , res) => {
    try {
        let accountInstrumentsDetails = await oanda.Accounts.accountInstrumentsDetails(req.params.accountID)
        res.send(accountInstrumentsDetails)
    }catch(err) {
        console.log(err.error)
    }
    
})

app.get('/accounts/:accountID/accountLatestChanges/:sinceTransactionID' , async (req , res) => {
    try {
        let accountLatestChanges = await oanda.Accounts.accountLatestChanges(req.params.accountID , req.params.sinceTransactionID)
        res.send(accountLatestChanges)
    }catch(err) {
        console.log(err.error)
    }
   
})


// Instruments End Points 
// app.get('/instruments/:instrument/instrumentCandles/:startFrom', async (req , res) => {
//     try{
        
//         let instrumentCandles = await oanda.Instruments.instrumentCandles(req.params.instrument , req.params.startFrom)
//         res.send(instrumentCandles)
//     }catch(err) {
//         console.log(err.error)
//     }
   

// })

app.get('/instruments/:instrument/instrumentOrderBook' ,async (req , res) => {
    try {

        let instrumentOrderBook = await oanda.Instruments.instrumentOrderBook(req.params.instrument)
 
        res.send(instrumentOrderBook)
    } catch(err){
        console.log(err.error);
        
    }
   
})

app.get('/instruments/:instrument/instrumentPositionBook' , async (req , res) => {
    try {
        let instrumentPositionBook = await oanda.Instruments.instrumentPositionBook(req.params.instrument)
        res.send(instrumentPositionBook)
    } catch (error) {
        console.log(error.error)
    }

})

// Orders 
app.post('/orders/:accountID/createNewOrder' , async (req , res) => {
    try {
        let units = req.body.units 
        let instrument = req.body.instrument
        let timeInForce = req.body.timeInForce
        let type = req.body.type 
        let positionFill = req.body.positionFill
        let accountID = req.params.accountID
        let price = req.body.price
        let clientExtensions = req.body.clientExtensions
        
        let createNewOrder = await oanda.Orders.createNewOrder(accountID , units , instrument , timeInForce , type , positionFill , price ,clientExtensions)

        res.send(createNewOrder)

    } catch (error) {
        console.log(error.error)
    }
    
    
})

app.get('/orders/:accountID/allAccountOrders' , async (req , res) => {
    try {
        let allAccountOrders = await oanda.Orders.allAccountOrders(req.params.accountID)
        res.send(allAccountOrders)
    } catch (error) {
        console.log(error.error)
        
    }
    
})

app.get('/orders/:accountID/allPendingOrders' , async (req , res) => {
    try {
        let allPendingOrders = await oanda.Orders.allPendingOrders(req.params.accountID)
        res.send(allPendingOrders)
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/orders/:accountID/orderDetail/:orderSpecifier' , async (req , res) => {

    try {
        let orderDetail = await oanda.Orders.orderDetail(req.params.accountID , req.params.orderSpecifier)
        res.send(orderDetail)
    } catch (error) {
        console.log(error.error)
    }

})

app.post('/orders/:accountID/orderCancel/:orderSpecifier' , async (req , res) => {
    try {
        let orderCancel = await oanda.Orders.orderCancel(req.params.accountID , req.params.orderSpecifier)
        res.send(orderCancel)
    } catch (error) {
        console.log(error.error)
    }
    
})


// Trades End Point 

app.get('/trades/:accountID/allTrades' , async (req , res) => {
    try {
        let allTrades = oanda.Trades.allTrades(req.params.accountID)
        res.send(allTrades)
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/trades/:accountID/allOpenTrades' , async (req , res) => {
    try {
        let allOpenTrades = await oanda.Trades.allOpenTrades(req.params.accountID)
        res.send(allOpenTrades)
            
    } catch (error) {
        console.log(error.error)
    }
   
})

app.get('/trades/:accountID/tradeDetails/:tradeSpecifier' , async (req , res) => {
    try {
        let tradeDetails = await oanda.Trades.tradeDetails(req.params.accountID , req.params.tradeSpecifier)
        res.send(tradeDetails)
    } catch (error) {
        console.log(error.error)
    }
    
})

app.post('/trades/:accountID/closeTrade/:tradeSpecifier' , async (req , res) => {
    try {
        let closeTrade = await oanda.Trades.closeTrade(req.params.accountID , req.params.tradeSpecifier)
        res.send(closeTrade)
    } catch (error) {
        console.log(error.error)
    }
    
    

})

app.post('/trades/:accountID/trailingStopOnTrades/:tradeSpecifier' , async (req , res) => {
    try {
        let takeProfitPrice = req.body.takeProfitPrice
        let stopLossPrice = req.body.stopLossPrice
        let timeInForce = req.body.timeInForce

        let trailingStopOnTrades = await oanda.Trades.trailingStopOnTrades(req.params.accountID , req.params.tradeSpecifier , takeProfitPrice , stopLossPrice , timeInForce)
        res.send(trailingStopOnTrades)
            
    } catch (error) {
        console.log(error.error)
    }
    

    
})

// Positions End Points 
app.get('/positions/:accountID/allPositions' , async (req , res) => {
    try {
        let allPositions = await oanda.Positions.allPositions(req.params.accountID)
        res.send(allPositions)
            
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/positions/:accountID/allOpenPositions' ,async (req , res) => {
    try {
        let allOpenPositions = await oanda.Positions.allOpenPositions(req.params.accountID)
        res.send(allOpenPositions)
             
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/positions/:accountID/singlePositionDetails/:instrument' ,async (req , res) => {
    try {
        let singlePositionDetails = await oanda.Positions.singlePositionDetails(req.params.accountID , req.params.instrument)
        res.send(singlePositionDetails)
            
    } catch (error) {
        console.log(error.error)
    }
    
})

app.post('/positions/:accountID/closeSinglePosition/:instrument', async (req , res) => {
    try {
        let longUnits = req.body.longUnits
        let closeSinglePosition = await oanda.Positions.closeSinglePosition(req.params.accountID , req.params.instrument , longUnits)
        res.send(closeSinglePosition)
             
    } catch (error) {
        console.log(error.error)
    }
    

})


// Transactions End Points 
app.get('/transactions/:accountID/allTransactions' , async (req , res) => {
    try {
        let allTransactions = await oanda.Transactions.allTransactions(req.params.accountID)
        res.send(allTransactions)
             
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/transactions/:accountID/singleAccountTransactionDetails/:transactionID' , async (req , res) => {
    try {
        let singleAccountTransactionDetails = await oanda.Transactions.singleAccountTransactionDetails(req.params.accountID , req.params.transactionID)
        res.send(singleAccountTransactionDetails)
            
    } catch (error) {
        console.log(error.error)
    }
    
})

app.post('/transactions/:accountID/searchTransactionsByIDRange', async (req ,res) => {
    try {
        let idRangeFrom = req.body.idRangeFrom
        let idRangeTo = req.body.idRangeTo

        let searchTransactionsByIDRange = await oanda.Transactions.searchTransactionsByIDRange(req.params.accountID , idRangeFrom , idRangeTo)
        res.send(searchTransactionsByIDRange)
            
    } catch (error) {
        console.log(error.error)
    }


   
})

app.get('/transactions/:accountID/searchTransactionStartingFromSpecificID/:transactionID' ,  async (req , res) => {
    try {
        let searchTransactionStartingFromSpecificID = await oanda.Transactions.searchTransactionStartingFromSpecificID(req.params.accountID , req.params.transactionID)
        res.send(searchTransactionStartingFromSpecificID)
             
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/transactions/:accountID/streamLatestTransactions' ,async (req , res) => {
    try {
        let streamLatestTransactions = await oanda.Transactions.streamLatestTransactions(req.params.accountID)
        res.send(streamLatestTransactions)
            
    } catch (error) {
        console.log(error.error)
    }
    
})

// Pricings End Points 
app.get('/pricings/:accountID/latestCandlesResult' , async (req , res) => {
    try {
        let latestCandlesResult = await oanda.Pricings.latestCandlesResult(accountID)
        res.send(latestCandlesResult)
            
    } catch (error) {
        console.log(error.error)
    }
   
})

app.get('/pricings/:accountID/specificPricingDetails' , async (req , res) => {
    try {
        let specificPricingDetails = await oanda.Pricings.specificPricingDetails(req.params.accountID)
        res.send(specificPricingDetails)
            
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/pricings/:accountID/pricingStream' , async (req , res) => {
    try {
        let pricingStream = await oanda.Pricings.pricingStream(req.params.accountID)
        res.send(pricingStream)    
    } catch (error) {
        console.log(error.error)
    }
    
})

app.get('/pricings/:accountID/fetchInstrumentCandleResults/:instrument' , async (req, res) => {
    try {
        let fetchInstrumentCandleResults = await oanda.Pricings.fetchInstrumentCandleResults(req.params.accountID , req.params.instrument)
        res.send(fetchInstrumentCandleResults)
            
    } catch (error) {
        console.log(error.error)
    }
    
})




app.listen(3000 , () => 
console.log('Example app listening on port 3000!')
)