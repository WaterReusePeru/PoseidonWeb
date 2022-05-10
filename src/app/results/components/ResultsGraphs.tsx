import { useAppSelector } from '../../hooks'

import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { BasicTooltip } from '@nivo/tooltip'

import { communityInfos, treatmentTrains, waterQualities, WaterQuality } from '../../data/model'

export const ResultsGraph = () => {
  const solutionsState = useAppSelector((state) => state.case.solutions)
  const commState = useAppSelector((state) => state.case.commInfo)
  const endUseState = useAppSelector((state) => state.case.endUse)

  console.log(solutionsState)

  const currency = commState.currency === 1 ? communityInfos[commState.countryID].currency : 'USD'

  const endUseQuality = waterQualities[endUseState.qualityClass!]

  const solutions = solutionsState.filter((solution) => {
    console.log(solution)
    if (Object.keys(solution).length !== 0 && solution.treatmentTrain !== undefined) {
      return true
    }
    return false
  })

  let data = []

  data = solutions.map((solution) => {
    const solutionData = Object.keys(solution.values).map((key) => {
      return {
        factor: key,
        x: solution.costPerCubic * 1000,
        y:
          solution.values[key] === (NaN || undefined) && endUseQuality[key as keyof WaterQuality] === (NaN || undefined)
            ? 100
            : 100 * (solution.values[key] / Number(endUseQuality[key as keyof WaterQuality])),
      }
    })
    return {
      id: treatmentTrains[solution.treatmentTrain!].category + ' - ' + treatmentTrains[solution.treatmentTrain!].title,
      data: solutionData,
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
      tooltip={({ node }) => (
        <BasicTooltip
          id={node.serieId}
          value={`Factor: ${node.data.factor}, x:  ${node.formattedX} ${currency}, y: ${node.formattedY} %`}
          enableChip={true}
          color={node.color}
        />
      )}
      /* tooltip1={function ({ node }) {
        console.log(node)
        return (
          <div>
            <br />
            {`Factor: ${node.data.factor}`}
            <br />
            {`Cost per Cubic: ${node.formattedX} ${currency}`}
            <br />
            {`min. Requirements met: ${node.formattedY} %`}
          </div>
        )
      }} */
    />
  )
}
