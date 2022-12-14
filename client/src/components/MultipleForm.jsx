
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { FormControl, Box, Select, MenuItem, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Ticker, AllOptionsContracts } from '../utils/apiService';
import MultipleDatagrid from './MultipleDatagrid';
import { useRef } from 'react';
var weekday = require('dayjs/plugin/weekday')


function MultipleForm({ formVisible, setFooterVisible }) {

  const [ticksName, setTicksName] = useState([]);


  useEffect(() => {
    let tickName = [];
    Ticker().then((result) => (
      result.map(result => {
        let tickers = [] //eliminate double
        tickName.map(ticker => tickers.push(ticker.ticker))
        for (let i = 0; i < result.results.length; i++) {
          if (!tickers.includes(result.results[i].ticker))
            tickName.push({
              ticker: result.results[i].ticker,
              companyName: result.results[i].name
            })
        }
      }
      ),
      setTicksName(tickName.sort((a, b) => (a.ticker > b.ticker) ? 1 : ((b.ticker > a.ticker) ? -1 : 0)))
    )
    )
  }, []);


  const tickerShowed = {
    options: ticksName,
    getOptionLabel: (option) => `${option.ticker} : ${option.companyName}`,
  };

  dayjs.extend(weekday)
  const [tickerSelected, setTickerSelected] = useState([]);
  const [typeOption, setTypeOption] = useState("");
  const [expirationDate, setExpirationDate] = useState(dayjs().weekday(5))
  const [dataToRender, setDataToRender] = useState([]);
  const [allTickerSelected, setAllTickerSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)
  const elref = useRef(null)



  function handleSubmit(e) {
    e.preventDefault()
    setFooterVisible(true)
    setDataToRender([])
    setIsLoaded(false)
    elref.current?.scrollIntoView({ behavior: 'smooth' })
    const optionSelection = {
      tickerSelected,
      expirationYear: expirationDate.$y,
      expirationMonth: expirationDate.$M,
      expirationDay: expirationDate.$D,
      typeOption,
      allTickerSelected
    }
    let allTickerArray = []
    if (tickerSelected.length === 0) {
      ticksName.map(item => allTickerArray.push({ ticker: item.ticker }))
      setAllTickerSelected(allTickerArray)
    }
    AllOptionsContracts(optionSelection).then(res => setDataToRender(res)).then(setIsLoaded(true))
  }

  function onlyFriday(date) {
    return date.$W !== 5
  }

  return (
    <>
      {formVisible && <>
        {ref.current?.scrollIntoView({ behavior: 'smooth' })}
        <div className="Home">
          <form ref={ref} onSubmit={handleSubmit} className='form'>
            <Box sx={{ minWidth: 120 }}>
              <div className='fieldContainer'>
                <Autocomplete
                  multiple
                  {...tickerShowed}
                  value={tickerSelected}
                  onChange={(event, saveTicker) => {
                    ref.current?.scrollIntoView({ behavior: 'smooth' })
                    setTickerSelected(saveTicker)
                  }}
                  onMouseOver={ref.current?.scrollIntoView({ behavior: 'smooth' })}
                  id="auto-highlight"
                  autoHighlight
                  renderInput={(params) => (
                    <TextField {...params} label="Stock" variant="standard" helperText="If empty, the Nasdaq100 components will be displayed (this may take some time)" />
                  )}
                />
              </div>
              <div className='fieldContainer'>
                <FormControl spacing={1} sx={{ width: '100%' }}>
                  <InputLabel required id="OptionType">Option type</InputLabel>
                  <Select
                    required
                    defaultValue=""
                    labelId="OptionType"
                    id="OptionType"
                    label="Option type"
                    value={typeOption || ""}
                    onChange={e => setTypeOption(e.target.value)}
                  >
                    <MenuItem value="call">Call</MenuItem>
                    <MenuItem value="put">Put</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='fieldContainer'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      getOpenDialogAriaText={(date, utils) => (`Choose date, selected date is ${utils.format(utils.date(date), 'fullDate')}`)}
                      shouldDisableDate={onlyFriday}
                      label="Expiration Date"
                      inputFormat="DD/MM/YYYY"
                      minDate={dayjs()}
                      defaultValue=""
                      value={expirationDate}
                      onChange={(saveDate) => {
                        setExpirationDate(saveDate)
                      }}
                      renderInput={(params) => <TextField required {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>

              <input type="submit" value="submit" className='submit' />
            </Box>
          </form >

          <div>
            {isLoaded ?
              <>
                <div ref={elref}>
                </div>
                <MultipleDatagrid dataToRender={dataToRender} />
                {ref.current?.scrollIntoView({ behavior: 'smooth' })}
              </> : null}
          </div>
        </div>
      </>}
    </>
  )
}

export default MultipleForm