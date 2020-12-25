<template>
    <div class="spinner" v-if="active">
        <icon icon="spinner" spin/>
    </div>
</template>

<script>
export default {
    name: 'Spinner',
    props: ['active']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.spinner {
    z-index: 9999;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: rgba(248, 255, 247, 0.77);
    width: 100%;
    height: 100%;

    svg {
        margin-top: 30vh;
        font-size: 3em;
    }
}
</style>
