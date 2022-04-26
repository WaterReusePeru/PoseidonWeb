import makeStyles from '@mui/styles/makeStyles'

import { Theme } from '@mui/material/styles'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import { useAppSelector } from '../../hooks'

import { ResponsiveScatterPlot } from '@nivo/scatterplot'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2,
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const ResultsGraph = () => {
  //const solutionsState = useAppSelector((state) => state.case.solutions)

  const data = [
    {
      id: 'group A',
      data: [
        {
          x: 57,
          y: 112,
        },
        {
          x: 36,
          y: 94,
        },
        {
          x: 34,
          y: 45,
        },
        {
          x: 9,
          y: 108,
        },
        {
          x: 74,
          y: 29,
        },
        {
          x: 59,
          y: 62,
        },
        {
          x: 93,
          y: 79,
        },
        {
          x: 19,
          y: 56,
        },
        {
          x: 41,
          y: 110,
        },
        {
          x: 20,
          y: 26,
        },
        {
          x: 19,
          y: 31,
        },
        {
          x: 39,
          y: 45,
        },
        {
          x: 4,
          y: 34,
        },
        {
          x: 65,
          y: 78,
        },
        {
          x: 92,
          y: 54,
        },
        {
          x: 26,
          y: 116,
        },
        {
          x: 30,
          y: 31,
        },
        {
          x: 50,
          y: 56,
        },
        {
          x: 72,
          y: 105,
        },
        {
          x: 44,
          y: 83,
        },
        {
          x: 39,
          y: 13,
        },
        {
          x: 34,
          y: 53,
        },
        {
          x: 75,
          y: 40,
        },
        {
          x: 68,
          y: 15,
        },
        {
          x: 85,
          y: 45,
        },
        {
          x: 54,
          y: 70,
        },
        {
          x: 80,
          y: 27,
        },
        {
          x: 36,
          y: 68,
        },
        {
          x: 97,
          y: 23,
        },
        {
          x: 34,
          y: 30,
        },
        {
          x: 70,
          y: 24,
        },
        {
          x: 72,
          y: 107,
        },
        {
          x: 12,
          y: 91,
        },
        {
          x: 33,
          y: 29,
        },
        {
          x: 67,
          y: 28,
        },
        {
          x: 40,
          y: 25,
        },
        {
          x: 60,
          y: 103,
        },
        {
          x: 29,
          y: 92,
        },
        {
          x: 90,
          y: 24,
        },
        {
          x: 74,
          y: 79,
        },
        {
          x: 12,
          y: 47,
        },
        {
          x: 51,
          y: 85,
        },
        {
          x: 9,
          y: 117,
        },
        {
          x: 34,
          y: 24,
        },
        {
          x: 61,
          y: 91,
        },
        {
          x: 94,
          y: 69,
        },
        {
          x: 93,
          y: 6,
        },
        {
          x: 5,
          y: 60,
        },
        {
          x: 77,
          y: 101,
        },
        {
          x: 19,
          y: 43,
        },
      ],
    },
    {
      id: 'group B',
      data: [
        {
          x: 61,
          y: 57,
        },
        {
          x: 46,
          y: 25,
        },
        {
          x: 44,
          y: 12,
        },
        {
          x: 65,
          y: 43,
        },
        {
          x: 42,
          y: 4,
        },
        {
          x: 29,
          y: 10,
        },
        {
          x: 15,
          y: 118,
        },
        {
          x: 47,
          y: 60,
        },
        {
          x: 66,
          y: 62,
        },
        {
          x: 32,
          y: 60,
        },
        {
          x: 52,
          y: 19,
        },
        {
          x: 0,
          y: 88,
        },
        {
          x: 82,
          y: 94,
        },
        {
          x: 46,
          y: 70,
        },
        {
          x: 7,
          y: 11,
        },
        {
          x: 52,
          y: 30,
        },
        {
          x: 7,
          y: 107,
        },
        {
          x: 31,
          y: 88,
        },
        {
          x: 98,
          y: 66,
        },
        {
          x: 68,
          y: 61,
        },
        {
          x: 46,
          y: 48,
        },
        {
          x: 1,
          y: 46,
        },
        {
          x: 49,
          y: 4,
        },
        {
          x: 47,
          y: 29,
        },
        {
          x: 68,
          y: 46,
        },
        {
          x: 40,
          y: 41,
        },
        {
          x: 83,
          y: 84,
        },
        {
          x: 57,
          y: 19,
        },
        {
          x: 2,
          y: 85,
        },
        {
          x: 50,
          y: 1,
        },
        {
          x: 8,
          y: 6,
        },
        {
          x: 56,
          y: 22,
        },
        {
          x: 61,
          y: 36,
        },
        {
          x: 37,
          y: 80,
        },
        {
          x: 88,
          y: 98,
        },
        {
          x: 52,
          y: 41,
        },
        {
          x: 33,
          y: 64,
        },
        {
          x: 92,
          y: 10,
        },
        {
          x: 61,
          y: 27,
        },
        {
          x: 47,
          y: 114,
        },
        {
          x: 71,
          y: 58,
        },
        {
          x: 89,
          y: 12,
        },
        {
          x: 84,
          y: 96,
        },
        {
          x: 59,
          y: 18,
        },
        {
          x: 48,
          y: 42,
        },
        {
          x: 70,
          y: 10,
        },
        {
          x: 17,
          y: 23,
        },
        {
          x: 25,
          y: 18,
        },
        {
          x: 82,
          y: 49,
        },
        {
          x: 33,
          y: 101,
        },
      ],
    },
    {
      id: 'group C',
      data: [
        {
          x: 74,
          y: 117,
        },
        {
          x: 0,
          y: 109,
        },
        {
          x: 83,
          y: 62,
        },
        {
          x: 20,
          y: 50,
        },
        {
          x: 99,
          y: 55,
        },
        {
          x: 84,
          y: 87,
        },
        {
          x: 4,
          y: 78,
        },
        {
          x: 79,
          y: 115,
        },
        {
          x: 85,
          y: 12,
        },
        {
          x: 100,
          y: 0,
        },
        {
          x: 83,
          y: 88,
        },
        {
          x: 54,
          y: 10,
        },
        {
          x: 96,
          y: 19,
        },
        {
          x: 16,
          y: 92,
        },
        {
          x: 81,
          y: 91,
        },
        {
          x: 49,
          y: 23,
        },
        {
          x: 13,
          y: 3,
        },
        {
          x: 11,
          y: 104,
        },
        {
          x: 98,
          y: 83,
        },
        {
          x: 79,
          y: 21,
        },
        {
          x: 66,
          y: 91,
        },
        {
          x: 71,
          y: 119,
        },
        {
          x: 33,
          y: 88,
        },
        {
          x: 72,
          y: 80,
        },
        {
          x: 38,
          y: 94,
        },
        {
          x: 28,
          y: 44,
        },
        {
          x: 12,
          y: 81,
        },
        {
          x: 75,
          y: 16,
        },
        {
          x: 41,
          y: 20,
        },
        {
          x: 35,
          y: 97,
        },
        {
          x: 43,
          y: 14,
        },
        {
          x: 10,
          y: 78,
        },
        {
          x: 70,
          y: 57,
        },
        {
          x: 18,
          y: 17,
        },
        {
          x: 75,
          y: 28,
        },
        {
          x: 73,
          y: 102,
        },
        {
          x: 60,
          y: 4,
        },
        {
          x: 56,
          y: 120,
        },
        {
          x: 77,
          y: 28,
        },
        {
          x: 10,
          y: 93,
        },
        {
          x: 23,
          y: 99,
        },
        {
          x: 17,
          y: 81,
        },
        {
          x: 61,
          y: 0,
        },
        {
          x: 10,
          y: 69,
        },
        {
          x: 35,
          y: 95,
        },
        {
          x: 6,
          y: 64,
        },
        {
          x: 66,
          y: 39,
        },
        {
          x: 78,
          y: 112,
        },
        {
          x: 45,
          y: 111,
        },
        {
          x: 93,
          y: 18,
        },
      ],
    },
    {
      id: 'group D',
      data: [
        {
          x: 1,
          y: 86,
        },
        {
          x: 61,
          y: 65,
        },
        {
          x: 36,
          y: 46,
        },
        {
          x: 78,
          y: 110,
        },
        {
          x: 100,
          y: 48,
        },
        {
          x: 14,
          y: 113,
        },
        {
          x: 67,
          y: 42,
        },
        {
          x: 17,
          y: 13,
        },
        {
          x: 85,
          y: 40,
        },
        {
          x: 26,
          y: 106,
        },
        {
          x: 71,
          y: 102,
        },
        {
          x: 3,
          y: 44,
        },
        {
          x: 38,
          y: 4,
        },
        {
          x: 1,
          y: 25,
        },
        {
          x: 19,
          y: 49,
        },
        {
          x: 94,
          y: 120,
        },
        {
          x: 79,
          y: 56,
        },
        {
          x: 9,
          y: 99,
        },
        {
          x: 37,
          y: 24,
        },
        {
          x: 23,
          y: 12,
        },
        {
          x: 33,
          y: 119,
        },
        {
          x: 84,
          y: 74,
        },
        {
          x: 89,
          y: 81,
        },
        {
          x: 62,
          y: 36,
        },
        {
          x: 42,
          y: 48,
        },
        {
          x: 0,
          y: 76,
        },
        {
          x: 85,
          y: 107,
        },
        {
          x: 78,
          y: 75,
        },
        {
          x: 35,
          y: 107,
        },
        {
          x: 52,
          y: 23,
        },
        {
          x: 76,
          y: 94,
        },
        {
          x: 88,
          y: 120,
        },
        {
          x: 89,
          y: 3,
        },
        {
          x: 71,
          y: 95,
        },
        {
          x: 44,
          y: 91,
        },
        {
          x: 90,
          y: 93,
        },
        {
          x: 69,
          y: 52,
        },
        {
          x: 72,
          y: 27,
        },
        {
          x: 62,
          y: 16,
        },
        {
          x: 26,
          y: 2,
        },
        {
          x: 51,
          y: 52,
        },
        {
          x: 66,
          y: 106,
        },
        {
          x: 51,
          y: 14,
        },
        {
          x: 0,
          y: 48,
        },
        {
          x: 23,
          y: 29,
        },
        {
          x: 32,
          y: 43,
        },
        {
          x: 18,
          y: 83,
        },
        {
          x: 86,
          y: 16,
        },
        {
          x: 0,
          y: 14,
        },
        {
          x: 90,
          y: 22,
        },
      ],
    },
    {
      id: 'group E',
      data: [
        {
          x: 91,
          y: 68,
        },
        {
          x: 98,
          y: 10,
        },
        {
          x: 63,
          y: 25,
        },
        {
          x: 31,
          y: 120,
        },
        {
          x: 49,
          y: 16,
        },
        {
          x: 71,
          y: 8,
        },
        {
          x: 27,
          y: 5,
        },
        {
          x: 60,
          y: 45,
        },
        {
          x: 92,
          y: 51,
        },
        {
          x: 67,
          y: 29,
        },
        {
          x: 31,
          y: 56,
        },
        {
          x: 41,
          y: 91,
        },
        {
          x: 39,
          y: 102,
        },
        {
          x: 47,
          y: 88,
        },
        {
          x: 22,
          y: 70,
        },
        {
          x: 55,
          y: 117,
        },
        {
          x: 42,
          y: 10,
        },
        {
          x: 23,
          y: 23,
        },
        {
          x: 1,
          y: 114,
        },
        {
          x: 57,
          y: 20,
        },
        {
          x: 30,
          y: 106,
        },
        {
          x: 94,
          y: 1,
        },
        {
          x: 59,
          y: 39,
        },
        {
          x: 0,
          y: 22,
        },
        {
          x: 26,
          y: 120,
        },
        {
          x: 62,
          y: 3,
        },
        {
          x: 40,
          y: 21,
        },
        {
          x: 16,
          y: 12,
        },
        {
          x: 82,
          y: 97,
        },
        {
          x: 4,
          y: 21,
        },
        {
          x: 2,
          y: 63,
        },
        {
          x: 38,
          y: 40,
        },
        {
          x: 53,
          y: 54,
        },
        {
          x: 90,
          y: 75,
        },
        {
          x: 12,
          y: 102,
        },
        {
          x: 28,
          y: 64,
        },
        {
          x: 63,
          y: 15,
        },
        {
          x: 3,
          y: 75,
        },
        {
          x: 42,
          y: 100,
        },
        {
          x: 59,
          y: 42,
        },
        {
          x: 52,
          y: 54,
        },
        {
          x: 1,
          y: 79,
        },
        {
          x: 62,
          y: 95,
        },
        {
          x: 34,
          y: 9,
        },
        {
          x: 100,
          y: 25,
        },
        {
          x: 6,
          y: 29,
        },
        {
          x: 78,
          y: 93,
        },
        {
          x: 18,
          y: 12,
        },
        {
          x: 75,
          y: 26,
        },
        {
          x: 44,
          y: 102,
        },
      ],
    },
  ]

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
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
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
