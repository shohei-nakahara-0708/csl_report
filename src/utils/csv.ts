import axios from 'axios'
import { parse } from 'papaparse'

export const readCsvData = (filepath: string, delimiter?: string): Promise<Array<unknown>> => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: filepath,
    })
      .then((response) => {
        if (response.data) {
          resolve(parse(response.data, { header: true, delimiter: delimiter ? delimiter : ',' }).data)
        } else {
          const err = Error('CSVの読み込みに失敗しました。')
          reject(err)
        }
      })
      .catch((result) => {
        reject(result)
      })
  })
}
