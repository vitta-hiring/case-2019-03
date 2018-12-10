<template>
    <Section :title="section.title" :actions="section.actions">

        <div class="form">
            <div class="form__input-group">
                <label class="form__label" for="date">Date</label>
                <input type="text" class="form__input" name="date" id="date" v-model="section.form.date" readonly>
            </div>
        </div>

        <h3>Add medicine</h3>
        <div class="form">
            <div class="form__input-group">
                <label class="form__label" for="medicine">Medicine</label>
                <input type="text" class="form__input" name="medicine" id="medicine" v-model="section.form.prescription.medicine">
            </div>
            <div class="form__input-group">
                <label class="form__label" for="dosage">Dosage</label>
                <input type="text" class="form__input" name="dosage" id="dosage" v-model="section.form.prescription.dosage">
            </div>
            <div class="form__input-group">
                <label class="form__label" for="via">Via</label>
                <input type="text" class="form__input" name="via" id="via" v-model="section.form.prescription.via">
            </div>
            <button v-on:click="addMedicine">Add</button>
        </div>

        <table v-if="section.table.items.length > 0">
            <thead>
            <tr>
                <th v-for="item in section.table.header" v-bind:key="item">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in section.table.items" v-bind:key="item.medicine">
                <td>{{item.medicine}}</td>
                <td>{{item.dosage}}</td>
                <td>{{item.via}}</td>
            </tr>
            </tbody>
        </table>
    </Section>
</template>

<script>
    import Section from '../../components/Section';

    export default {
        name: "PrescriptionForm",
        data() {
            return {
                section: {
                    title: 'Prescription',
                    actions: [
                        {to: '/attendance/' + this.$route.params.id, label: 'Back to Prescriptions'}
                    ],
                    form: {
                        date: this.currentDateFormatted(),
                        prescription: {
                            medicine: '',
                            dosage: '',
                            via: ''
                        }
                    },
                    table: {
                        header: ['Medicine', 'Dosage', 'Via Administration'],
                        items: []
                    }
                }
            }
        },
        methods: {
            addMedicine: function () {
                this.section.table.items.push(this.section.form.prescription);
                this.resetPrescriptionForm();
            },
            resetPrescriptionForm: function () {
                this.section.form.prescription = {
                    medicine: '',
                    dosage: '',
                    via: ''
                };
            },
            currentDateFormatted: function () {
                const current = new Date(),
                    year = current.getFullYear(),
                    month = current.getMonth() + 1;

                let day = current.getDate();

                if (day > 0 && day < 10) {
                    day = '0' + day;
                }

                return day + '/' + month + '/' + year;
            }
        },
        components: {
            Section
        }
    }
</script>
