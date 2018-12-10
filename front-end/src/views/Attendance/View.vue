<template>
    <div class="attendance__view">
        <PageTitle :title="page.title + ' ' + $route.params.id" />
        <Card :doctor-name="card.doctorName" :patient-name="card.patientName"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import PageTitle from '../../components/PageTitle';
    import Card from '../../components/Card';

    export default {
        name: "AttendanceView",
        data() {
            return {
                page: {
                    title: 'Attendance'
                },
                card: {
                    doctorName: 'Annibal Machado',
                    patientName: 'Guilherme de Almeida Gomes'
                }
            }
        },
        components: {
            PageTitle,
            Card
        }
    }
</script>

<style scoped>

</style>