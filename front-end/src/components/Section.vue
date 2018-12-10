<template>
    <section class="section">
        <SectionHeader :title="title" :actions="actions" />
        <SectionBody>
            <slot></slot>
        </SectionBody>
    </section>
</template>

<script>
    import SectionHeader from '../components/SectionHeader';
    import SectionBody from '../components/SectionBody';

    export default {
        name: "Section",
        props: {
            title: String,
            actions: Array
        },
        components: {
            SectionHeader,
            SectionBody
        }
    }
</script>
