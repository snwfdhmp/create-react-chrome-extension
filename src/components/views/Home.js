import React from "react"

import Layout from "../Layout"
import { TopBar } from "../molecules/TopBar"
import { ContentTextArea } from "../molecules/ContentTextArea"
import { ApiKey } from "../molecules/ApiKey"
import { Credits } from "../molecules/Credits"
import { TokenCost } from "../molecules/TokenCost"
import { useActionState } from "../hooks/useActionState"
import { useApiKey } from "../hooks/useApiKey"
import { useContent } from "../hooks/useContent"

const HomeView = () => {
  const [apiKey, setApiKey] = useApiKey()
  const [content, setContent] = useContent()
  const [actionState, setActionState] = useActionState()

  return (
    <Layout>
      <TokenCost content={content} />
      <TopBar
        content={content}
        setContent={setContent}
        apiKey={apiKey}
        actionState={actionState}
        setActionState={setActionState}
      />
      <ContentTextArea
        apiKey={apiKey}
        content={content}
        setContent={setContent}
      />
      <p
        style={{
          textAlign: "left",
          lineHeight: "1em",
          verticalAlign: "center",
          margin: 0,
          marginTop: "5px",
          fontSize: "0.9em",
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
      >
        <ApiKey apiKey={apiKey} setApiKey={setApiKey} />
        <Credits style={{ float: "right" }} />
      </p>
    </Layout>
  )
}

export default HomeView
