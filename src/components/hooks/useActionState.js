import React from "react"

export const useActionState = () => {
  const [state, setState] = React.useState(null)

  return [state, setState]
}
