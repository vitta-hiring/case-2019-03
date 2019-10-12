<template>
    <section class="section">
        <vi-card>
            <div slot="body">
                <SectionHeader :title="title" :actions="actions" />
                <SectionBody>
                    <slot></slot>
                </SectionBody>
            </div>
        </vi-card>
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
