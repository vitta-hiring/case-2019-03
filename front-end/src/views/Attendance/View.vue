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
    import AttendanceService from '../../services/attendance';

    export default {
        name: "AttendanceView",
        data() {
            return {
                attendanceService: new AttendanceService(),
                page: {
                    title: 'Attendance'
                },
                card: {
                    doctorName: '',
                    patientName: ''
                }
            }
        },
        mounted() {
            this.setCard();
        },
        methods: {
            setCard() {
                this.card.doctorName = this.attendanceService.getItem('doctorName');
                this.card.patientName = this.attendanceService.getItem('patientName');
            },
        },
        components: {
            PageTitle,
            Card
        }
    }
</script>

<style scoped>

</style>