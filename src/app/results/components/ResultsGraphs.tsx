import { useAppSelector } from '../../hooks'

import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { communityInfos, treatmentTrains, waterQualities } from '../../data/model'

export const ResultsGraph = () => {
  const solutionsState = useAppSelector((state) => state.case.solutions)
  const commState = useAppSelector((state) => state.case.commInfo)
  const inputState = useAppSelector((state) => state.case.input)

  console.log(solutionsState)

  const currency = commState.currency === 1 ? communityInfos[commState.countryID].currency : 'USD'

  const inputQuality = inputState.custom ? inputState.customValues : waterQualities[inputState.qualityClass!]

  const solutions = solutionsState.filter((solution) => {
    if (Object.keys(solution).length !== 0 && solution.treatmentTrain !== undefined) {
      return true
    }
    return false
  })

  let data = []

  const obj = solutionsState[0].values

  let factorsArray = Object.keys(obj).map((key) => {
    if (obj[key] !== undefined) {
      return [key, obj[key]]
    } else {
      return null
    }
  })

  console.log('Factors: ' + factorsArray)

  data = solutions.map((solution) => {
    return {
      id: treatmentTrains[solution.treatmentTrain!].category + ' - ' + treatmentTrains[solution.treatmentTrain!].title,
      data: [
        {
          factor: 'turbidity',
          x: solution.costPerCubic,
          y: solution.values.turbidity === undefined ? 0 : solution.values.turbidity / inputQuality.turbidity!,
        },
        {
          factor: 'tss',
          x: solution.costPerCubic,
          y: solution.values.tss === undefined ? 0 : solution.values.tss / inputQuality.tss!,
        },
        {
          factor: 'bod',
          x: solution.costPerCubic,
          y: solution.values.bod === undefined ? 0 : solution.values.bod / inputQuality.bod!,
        },
        {
          factor: 'cod',
          x: solution.costPerCubic,
          y: solution.values.cod === undefined ? 0 : solution.values.cod / inputQuality.cod!,
        },
        {
          factor: 'tc',
          x: solution.costPerCubic,
          y: solution.values.tc === undefined ? 0 : solution.values.tc / inputQuality.tc!,
        },
        {
          factor: 'fc',
          x: solution.costPerCubic,
          y: solution.values.fc === undefined ? 0 : solution.values.fc / inputQuality.fc!,
        },
        /* {
          factor: 'average',
          x: solution.costPerCubic,
          y: solution.values.tss === undefined ? 0 : solution.values.tss
        }, */
      ],
    }
  })

  console.log(data)

  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
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
        legend: 'Cost Cer Cubic [' + currency + ']',
        legendPosition: 'middle',
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'min. Requirements met [%]',
        legendPosition: 'middle',
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: 'left-to-right',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}
