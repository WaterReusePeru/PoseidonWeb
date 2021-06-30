import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@material-ui/core/styles'

export const Bar = props => {
  const theme = useTheme()

  const data = [
    {
      name: 'input',
      [props.factor]: props.input
    }
  ]

  const output = {
    name: 'output',
    [props.factor]: props.output
  }

  if (props.output) {
    data.push(output)
  }

  console.log(theme)

  return (
    <div style={{ height: 200, width: 80 }}>
      <ResponsiveBar
        data={data}
        indexBy="name"
        keys={[props.factor]}
        margin={{ top: 10, right: 0, bottom: 40, left: 0 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: false }}
        colors={{ scheme: 'paired' }}
        colorBy="indexValue"
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'tss',
          legendPosition: 'middle',
          legendOffset: 30
        }}
        enableGridY={false}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={115}
        motionDamping={15}
      />
    </div>
  )
}
