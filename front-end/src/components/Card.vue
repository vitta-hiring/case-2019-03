<template>
    <vi-card :title="title" title-size="2" secondary>
        <div slot="body">
            <strong>Doctor:</strong> {{doctorName}}<br>
            <strong>Patient:</strong> {{patientName}}
        </div>
    </vi-card>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            title: String,
            doctorName: String,
            patientName: String
        }
    }
</script>
