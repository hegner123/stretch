<script lang="ts">
    export let size = 56;
    export let backgroundColor = "";
    export let iconColor = "";
    export let weight = 4;
    let sizeHalf: number = 0;
    let sizeQuarter: number = 0;
    function halfSize(a: number) {
        return Math.round(a / 2);
    }

    function quaterSize(a: number) {
        return Math.round(a / 4);
    }
    $: {
        sizeHalf = halfSize(size);
        sizeQuarter = quaterSize(size);
    }
</script>

<!-- SVG Icon with dimensions 56x56 -->
<svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Background circle -->
    <circle cx={sizeHalf} cy={sizeHalf} r={sizeHalf} fill={backgroundColor} />
    <!-- Plus sign -->
    <line
        x1={sizeHalf}
        y1={sizeQuarter}
        x2={sizeHalf}
        y2={size - sizeQuarter}
        stroke={iconColor}
        stroke-width={weight}
    />
    <line
        x1={sizeQuarter}
        y1={sizeHalf}
        x2={size - sizeQuarter}
        y2={sizeHalf}
        stroke={iconColor}
        stroke-width={weight}
    />
</svg>
