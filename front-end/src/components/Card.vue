<template>
    <div class="card">
        <strong>Doctor:</strong> {{doctorName}}<br>
        <strong>Patient:</strong> {{patientName}}
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            doctorName: String,
            patientName: String
        }
    }
</script>

<style scoped>
    .card {
        width: 100%;
        margin-bottom: 20px;
    }
</style>