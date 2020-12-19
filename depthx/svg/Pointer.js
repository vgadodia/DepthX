import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function Pointer(props: SvgProps) {
  return (
    <Svg
      width={75}
      height={75}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M59.77 29.854v10.063l-4.166-.896V27.583a33.74 33.74 0 00-4.854-1.75v12.125l-4.167-.895V25a69.438 69.438 0 00-6.416-.75v11.48L36 34.832V9.042a5.27 5.27 0 00-5.417-5.063 5.27 5.27 0 00-5.416 5.063v32.333L21 43.458V32.5l-4.854-4.98a5.896 5.896 0 00-8.334 0 6.104 6.104 0 000 8.522l12.5 14.791a22.54 22.54 0 002.896 8.792 17.541 17.541 0 004.604 5.688v5.333h30.084v-6.854a26.125 26.125 0 006.25-17.709v-12.5a20.836 20.836 0 00-4.375-3.729z"
        fill="#39B3BB"
      />
    </Svg>
  )
}
