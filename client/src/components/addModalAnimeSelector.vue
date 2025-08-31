
<template>
    <div class="custom-select" :class="{'is-open': isOpen, [`status-${selectedValue}`]: true}">
        <div class="selected-option" @click="toggleOpen">
            <span class="status-indicator" :class="`indicator-${selectedValue}`"></span>
            {{ selectedLabel }}
            <span class="dropdown-arrow">▼</span>
        </div>
        <div v-if="isOpen" class="options-list">
            <div 
                v-for="option in options" 
                :key="option.value"
                :class="['option', `status-${option.value}`]"
                @click="selectOption(option)"
            >
                <span class="status-indicator" :class="`indicator-${option.value}`"></span>
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddModalAnimeSelector',
    props: {
        value: String,
        options: Array
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        selectedValue() {
            return this.value || this.options[0]?.value;
        },
        selectedLabel() {
            const option = this.options.find(opt => opt.value === this.selectedValue);
            return option ? option.label : '';
        }
    },
    methods: {
        toggleOpen() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.$emit('input', option.value);
            this.isOpen = false;
        },
        closeOnClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.closeOnClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeOnClickOutside);
    }
}
</script>

<style lang="scss" scoped>
@use '@/styles/scss/_fonts' as *;
@use '@/styles/scss/_variables' as *;
@use '@/styles/scss/_globals' as *;
@use '@/styles/scss/_mixin' as *;

.custom-select {
    position: relative;
    width: 140px;
}

.selected-option {
    padding: 6px 15px 6px 35px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 99px;
    cursor: pointer;
    position: relative;
    height: 28px;
    display: flex;
    align-items: center;
}

.status-indicator {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.indicator-watching {
    background-color: oklch(0.6255 0.1357 240);
}

.indicator-completed {
    background-color: oklch(0.5862 0.185 145);
}

.indicator-on-hold {
    background-color: oklch(0.8306 0.1815 73.51);
}

.indicator-dropped {
    background-color: oklch(0.595 0.2467 29.2339);
}

.indicator-planned {
    background-color: oklch(0.7205 0 300);
}

.status-watching {
    background-color: $color-status__watching;
    color: $base-white;
}

.status-completed {
    background-color: $color-status__completed;
    color: $base-white;
}

.status-on-hold {
    background-color: $color-status__hold;
    color: $base-white;
}

.status-dropped {
    background-color: $color-status__drop;
    color: $base-white;
}

.status-planned {
    background-color: $color-status__planned;
    color: $base-white;
}
</style>