<template>
    <div class="attendance__view">
        <Card :title="title" :doctor-name="doctorName" :patient-name="patientName" class="card"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Card from '../../components/Card';

    export default {
        computed: {
            title() {
                return 'Attendance ' + this.$route.params['id']
            },
            doctorName() {
                return this.$store.state.doctorName;
            },
            patientName() {
                return this.$store.state.patientName;
            }
        },
        components: {
            Card
        }
    }
</script>

<style scoped>
    .card {
        margin-bottom: 20px;
    }
</style>