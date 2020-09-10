<template>
  <div id="jira" v-if="!_isUser()">
    <div class="f-12-500-gray-light title-widget">{{ $t('jiraIntegration.title') }}</div>
    <div class="box div-default jira-componente">
      <div class="buttons-jira align-self-center">
        <button class="btn-jira">{{ $t('jiraIntegration.create') }}</button>
        <button class="btn-jira" style="margin: 0 5px">{{ $t('jiraIntegration.link') }}</button>
        <button class="btn-jira">{{ $t('jiraIntegration.notify') }}</button>
      </div>
      <div class="f-10-500-gray padding-10-trbl">{{ $t('jiraIntegration.linkedJiraIssues') }} (2)</div>
      <div class="flex flex-column item-ticket">
        <div class="flex flex-row flex-space-between">
          <div class="flex flex-row">
            <div class="padding-2-r">
              <img src="/static/icons/review.svg" alt>
            </div>
            <div class="f-12-500-blue-dark align-self-center">TASK TICKET - TYPE 1</div>
          </div>
          <div class="flex flex-row">
            <img src="/static/icons/eye.svg" alt class="text-right">
            <img src="/static/icons/close.svg" alt>
          </div>
        </div>
        <div class="padding-20-l">
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
        </div>
      </div>
      <div class="flex flex-column item-ticket">
        <div class="flex flex-row flex-space-between">
          <div class="flex flex-row">
            <div class="padding-2-r">
              <img src="/static/icons/review.svg" alt>
            </div>
            <div class="f-12-500-blue-dark align-self-center">TASK TICKET - TYPE 1</div>
          </div>
          <div class="flex flex-row">
            <img src="/static/icons/eye.svg" alt class="text-right">
            <img src="/static/icons/close.svg" alt>
          </div>
        </div>
        <div class="padding-20-l">
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
          <div>
            <span class="f-10-500-gray">ASSIGNEE:</span>
            <span class="f-10-300-gray">AGENT 1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
