import React from 'react'
import Workflow from './workflow'
import MoreCredits from './more-creadits'

// Force dynamic rendering to avoid build-time execution
export const dynamic = 'force-dynamic'

type Props = {}

const Workflows = async (props: Props) => {
  // Import function dynamically to avoid build-time execution
  const { onGetWorkflows } = await import('../_actions/workflow-connections')
  const workflows = await onGetWorkflows()
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <MoreCredits />
        {workflows?.length ? (
          workflows.map((flow) => (
            <Workflow
              key={flow.id}
              {...flow}
            />
          ))
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )}
      </section>
    </div>
  )
}

export default Workflows
