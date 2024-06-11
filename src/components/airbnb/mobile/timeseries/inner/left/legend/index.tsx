export const Legend = ({ yScale, tickFormat, tickValue, stroke, fill }: any) => (
    <>
      <rect
        x={-30}
        y={yScale(tickValue) - 10}
        width={30}
        height={20}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <text
        style={{textAnchor:"start", alignmentBaseline: "middle"}}
        x={-26}
        y={yScale(tickValue)}
        className="axis-left-text"
      >
        {tickFormat(tickValue)}
      </text>
    </>
  )
Legend.displayName="Legend"