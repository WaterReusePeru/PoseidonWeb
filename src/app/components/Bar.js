import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const Bar = props => {
  const theme = useTheme()
  const { t } = useTranslation()

  var outputColor = theme.palette.primary.main

  if (Number(props.input) > Number(props.output)) {
    outputColor = theme.palette.error.main
  } else {
    outputColor = theme.palette.success.main
  }

  const input = {
    name: t('input'),
    [props.factor]: props.input,
    color: theme.palette.primary.main
  }

  const average = {
    name: t('avg. input'),
    [props.factor]: props.average,
    color: theme.palette.info.main
  }

  const output = {
    name: t('output'),
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

  if (props.average) {
    data.push(average)
  }

  var legend

  if (props.factor === 'turbidity') {
    legend = t('Turbidity') + ' [' + props.unit + ']'
  } else {
    legend = props.factor.toUpperCase() + ' [' + props.unit + ']'
  }

  var label

  function getLabel(d) {
    if (props.factor === 'tc' || props.factor === 'fc') {
      return Number(d.value)
        .toExponential()
        .toLocaleString('de-CH')
    } else {
      return Number(d.value).toLocaleString('de-CH')
    }
  }

  return (
    <div style={{ height: 250, width: 100 }}>
      <ResponsiveBar
        data={data}
        indexBy="name"
        keys={[props.factor]}
        margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={d => d.data.color}
        colorBy="id"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legend,
          legendPosition: 'middle',
          legendOffset: 40
        }}
        labelSkipHeight={36}
        label={d => getLabel(d)}
        enableGridY={false}
        animate={true}
        motionStiffness={115}
        motionDamping={15}
        tooltip={({ id, value }) => (
          <Paper
            style={{
              padding: 12,
              background: '#fff'
            }}
          >
            {id.toUpperCase() + ':'} <br /> {Number(value).toLocaleString('de-CH') + ' [' + props.unit + ']'}
          </Paper>
        )}
      />
    </div>
  )
}
