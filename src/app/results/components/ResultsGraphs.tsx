import { useAppSelector } from '../../hooks'

import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { useTranslation } from 'react-i18next'

import { communityInfos, treatmentTrains, waterQualities, WaterQuality, waterQualityFactors } from '../../data/model'

export const ResultsGraph = () => {
  const { t } = useTranslation()

  const solutionsState = useAppSelector((state) => state.case.solutions)
  const commInfoState = useAppSelector((state) => state.case.commInfo)
  const endUseState = useAppSelector((state) => state.case.endUse)

  const currency = commInfoState.currency === 1 ? communityInfos[commInfoState.countryID].currency : 'USD'

  const endUseQuality = waterQualities[endUseState.qualityClass!]

  const solutions = solutionsState.filter((solution) => {
    if (Object.keys(solution).length !== 0 && solution.treatmentTrain !== undefined) {
      return true
    }
    return false
  })

  let data = []

  data = solutions.map((solution) => {
    const solutionData = Object.keys(solution.values).map((key) => {
      const factor = waterQualityFactors.find((quality) => quality.name === key)
      return {
        factor: factor?.nameShort,
        value: solution.values[key],
        unit: factor?.unit,
        x:
          commInfoState.currency === 0
            ? solution.costPerCubic
            : solution.costPerCubic * communityInfos[commInfoState.countryID].exchangeToUSD,
        y: 100 * (solution.values[key] / Number(endUseQuality[key as keyof WaterQuality])),
      }
    })
    return {
      id: treatmentTrains[solution.treatmentTrain!].category + ' - ' + treatmentTrains[solution.treatmentTrain!].title,
      data: solutionData,
    }
  })

  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      xFormat=">-.2f"
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      yFormat=">-.2f"
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: t('Cost per Cubic') + ' [' + currency + ']',
        legendPosition: 'middle',
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: t('Outflow Values / Limit Values') + ' [%]',
        legendPosition: 'middle',
        legendOffset: -60,
      }}
      colors={{ scheme: 'paired' }}
      tooltip={function ({ node }) {
        return (
          <div
            style={{
              background: node.color,
              padding: '3px 3px',
              fontSize: '12px',
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Treatment Train:</b>
                  </td>
                  <td>
                    <b>{node.serieId}</b>
                  </td>
                </tr>
                <tr>
                  <td>Factor:</td>
                  <td>{node.data.factor}</td>
                </tr>
                <tr>
                  <td>Output Value:</td>
                  <td>
                    {node.data.value.toPrecision(3)} {node.data.unit}
                  </td>
                </tr>
                <tr>
                  <td>Min. Requirements Met:</td>
                  <td>{node.formattedY} %</td>
                </tr>
                <tr>
                  <td>Cost Per Cubic:</td>
                  <td>
                    {node.formattedX} {currency}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }}
    />
  )
}
