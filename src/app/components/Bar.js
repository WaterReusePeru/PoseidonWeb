import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

export const Bar = props => {
  const theme = useTheme()

  var outputColor = theme.palette.primary.main

  if (props.input < props.output) {
    outputColor = theme.palette.error.main
  } else {
    outputColor = theme.palette.success.main
  }

  const input = {
    name: 'input',
    [props.factor]: props.input,
    color: theme.palette.primary.main
  }

  const output = {
    name: 'output',
    [props.factor]: props.output,
    color: outputColor
  }

  let data = []

  if (props.input) {
    data.push(input)
  }

  if (props.output) {
    data.push(output)
  }

  return (
    <div style={{ height: 200, width: 100 }}>
      <ResponsiveBar
        data={data}
        indexBy="name"
        keys={[props.factor]}
        margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: false }}
        colors={d => d.data.color}
        colorBy="id"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.factor.toUpperCase() + ' [' + props.unit + ']',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        labelSkipHeight={36}
        label={d => `${Number(d.value).toLocaleString('de-CH')}`}
        enableGridY={false}
        animate={true}
        motionStiffness={115}
        motionDamping={15}
        tooltip={({ id, value, color }) => (
          <Paper
            style={{
              padding: 12,
              background: '#fff'
            }}
          >
            {id.toUpperCase()}: {Number(value).toLocaleString('de-CH') + ' [' + props.unit + ']'}
          </Paper>
        )}
      />
    </div>
  )
}
