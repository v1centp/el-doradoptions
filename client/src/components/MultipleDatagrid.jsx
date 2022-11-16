import './../App.css'
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { NewsfromApi } from '../utils/apiService';
import { MdOpenInNew } from "react-icons/md";

function MultipleDatagrid({ dataToRender }) {


  const colStock = [
    { field: 'T', headerName: "Stock", width: 520 },
    { field: 'c', headerName: "Close", width: 70, type: "number" },
    { field: 'h', headerName: "High", width: 70, type: "number" },
    { field: 'l', headerName: "Low", width: 70, type: "number" },
    { field: 'n', headerName: "Transaction", width: 100, type: "number" },
    { field: 'o', headerName: "Open", width: 70, type: "number" },
    { field: 'v', headerName: "Volume", width: 100, type: "number" },
    // { field: 'id', headerName: "ID", width: 300 }
  ]

  let stockToRender = [...new Map(dataToRender.map((item) => [item.stockPrice.ticker, item])).values(),]


  const rowStock = stockToRender.map((row) => (
    {
      id: row.request_id,
      T: row.stockPrice.ticker,
      c: row.stockPrice.results[0].c,
      h: row.stockPrice.results[0].h,
      l: row.stockPrice.results[0].l,
      n: row.stockPrice.results[0].n,
      o: row.stockPrice.results[0].o,
      v: row.stockPrice.results[0].v,

    }))

  const colOption = [
    { field: 'T', headerName: "Options ticker", width: 200 },
    { field: 'st', headerName: "Stock", width: 70 },
    { field: 'stc', headerName: "Stock Close", width: 90, type: "number" },
    { field: 's', headerName: "Strike", width: 70 },
    { field: 'd', headerName: "Distance (%)", width: 100, type: "number" },
    { field: 'c', headerName: "Close", width: 70, type: "number" },
    { field: 'h', headerName: "High", width: 70, type: "number" },
    { field: 'l', headerName: "Low", width: 70, type: "number" },
    { field: 'n', headerName: "Transaction", width: 100, type: "number" },
    { field: 'o', headerName: "Open", width: 70, type: "number" },
    { field: 'v', headerName: "Volume", width: 100, type: "number" },
    // { field: 'id', headerName: "ID", width: 300 }
  ]


  const rowsOption = dataToRender.map((row) => ({
    id: row.request_id,
    st: row.stockPrice.ticker,
    stc: row.stockPrice.results[0].c,
    T: row.ticker,
    s: row.infoOptions.StrikePrice,
    d: ((row.infoOptions.StrikePrice - row.stockPrice.results[0].c) / row.stockPrice.results[0].c * 100).toFixed(2),
    c: row.results[0].c,
    h: row.results[0].h,
    l: row.results[0].l,
    n: row.results[0].n,
    o: row.results[0].o,
    v: row.results[0].v

  }))
  const [OpenStock, setOpenStock] = useState(false);
  const [OpenOption, setOpenOption] = useState(false);
  const [rowSelectedStock, setRowSelectedStock] = useState(false);
  const [rowSelectedOption, setRowSelectedOption] = useState(false);
  const [news, setNews] = useState("")

  const handleClose = () => {
    setOpenStock(false);
    setOpenOption(false);
  };

  const handleEventStock = (
    params
  ) => {
    setOpenStock(true)
    setRowSelectedStock(params.row.T);
    NewsfromApi({ ticker: params.row.T }).then(res => setNews(res))

  };
  const handleEventOption = (
    params
  ) => {
    setOpenOption(true)
    setRowSelectedOption(params.row.st);
    NewsfromApi({ ticker: params.row.st }).then(res => setNews(res))
  };


  return (
    <>
      {rowStock.length > 0 ?
        <div className="gridContainer">
          <div style={{ height: 250, width: '100%', cursor: "pointer" }}>
            <DataGrid
              onRowClick={handleEventStock}
              rows={rowStock}
              columns={colStock}
            />
          </div>
        </div> : <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
      <Dialog
        open={OpenStock}
        aria-labelledby="alert-dialog-Title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-Title">
          {rowSelectedStock} <MdOpenInNew />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {news && news.results.map(news => {
              return <div key={news.id}>
                <a href={news.article_url} target="_blank" rel="noreferrer">
                  <li> {news.description}</li>
                </a>
                <br></br>
              </div>
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Thanks
          </Button>
        </DialogActions>
      </Dialog>
      {rowsOption.length > 0 ? <div className='gridContainer'>
        <div style={{ height: 500, width: '100%', cursor: "pointer" }}>
          <DataGrid
            onRowClick={handleEventOption}
            rows={rowsOption}
            columns={colOption}
          />
        </div>
      </div> : rowStock.length > 0 ? <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> : null}
      <Dialog
        open={OpenOption}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {rowSelectedOption} <MdOpenInNew />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {news && news.results.map(news => {
              return <div key={news.id}>
                <a href={news.article_url} target="_blank" rel="noreferrer">
                  <li> {news.description} </li>
                </a>
                <br></br>
              </div>
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Thanks
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MultipleDatagrid