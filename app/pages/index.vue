<script setup>
  import { Label } from "@/components/ui/label"
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field"
  import { Home } from 'lucide-vue-next'
  import { ButtonGroup } from '@/components/ui/button-group'
  import { Button } from '@/components/ui/button'
  // import { Card } from '~/components/ui/card'
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  const display = ref('0')
  const buffer = ref(null)
  const op = ref(null)
  const justEvaluated = ref(false)

  function inputDigit(d) {
    if (justEvaluated.value) {
      display.value = d === '.' ? '0.' : d
      justEvaluated.value = false
      return
    }

    if (d === '.') {
      if (!display.value.includes('.')) display.value += '.'
      return
    }
    
    display.value = display.value === '0' ? d : display.value + d
  }

  function setOperator(next) {
    // If there was a pending op, evaluate first (chaining)
    if (op.value && buffer.value !== null && !justEvaluated.value) {
      evaluate()
    } else {
      buffer.value = display.value
    }

    op.value = next
    display.value = '0'
    justEvaluated.value = false
  }

  function toggleSign() {
    if (display.value === '0') return
    display.value = display.value.startsWith('-') ? display.value.slice(1) : '-' + display.value
  }

  function percent() {
    const n = parseFloat(display.value || '0')

    if (buffer.value && op.value && (op.value === '+' || op.value === '-' || op.value === '×')) {
      const base = parseFloat(buffer.value)
      display.value = String((base * n) / 100)
    } else {
      display.value = String(n / 100)
    }
  }

  function del() {
    if (justEvaluated.value) return
    display.value = display.value.length <= 1 || (display.value.length === 2 && display.value.startsWith('-'))
      ? '0'
      : display.value.slice(0, -1)
  }

  function clearAll() {
    display.value = '0'
    buffer.value = null
    op.value = null
    justEvaluated.value = false
  }

  function evalBinary(a, b, operator) {
    switch (operator) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b === 0 ? NaN : a / b
      case '%': return a % b
    }
  }

  function evaluate() {
    if (buffer.value === null || !op.value) return
    const a = parseFloat(buffer.value)
    const b = parseFloat(display.value)
    const res = evalBinary(a, b, op.value)
    display.value = Number.isFinite(res) ? String(res) : 'Error'
    buffer.value = null
    op.value = null
    justEvaluated.value = true
  }

  const formula = computed(() => (buffer.value && op.value ? `${buffer.value} ${op.value}` : ''))

  // Keyboard support
  function onKey(e) {
    const k = e.key
    if (/^\d$/.test(k)) return inputDigit(k)
    if (k === '.') return inputDigit('.')
    if (k === 'Backspace') return del()
    if (k === 'Escape') return clearAll()
    if (k === 'Enter' || k === '=') return evaluate()
    if (k === '+') return setOperator('+')
    if (k === '-') return setOperator('-')
    if (k === '*') return setOperator('×')
    if (k === '/') return setOperator('÷')
    if (k === '%') return percent()
  }

  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class=" flex items-center justify-center p-4">
    
    <div class="w-full max-w-sm rounded-2xl shadow-xl bg-white dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-700">
      <div class="p-5">
        <div class="text-xs text-gray-400 dark:text-neutral-400 h-5 flex items-center justify-end select-none">
          <span v-if="formula">{{ formula }}</span>
        </div>
        <div
          class="mt-1 mb-4 text-right text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white wrap-break-word min-h-14 select-none"
          data-testid="display"
        >
          {{ display }}
        </div>

        <div class="grid grid-cols-4 gap-2">
          <!-- Row 1 -->
          <button class="btn muted" @click="clearAll">AC</button>
          <button class="btn muted" @click="del">DEL</button>
          <button class="btn muted" @click="toggleSign">+/-</button>
          <button class="btn op" @click="setOperator('÷')">÷</button>

          <!-- Row 2 -->
          <button class="btn" @click="inputDigit('7')">7</button>
          <button class="btn" @click="inputDigit('8')">8</button>
          <button class="btn" @click="inputDigit('9')">9</button>
          <button class="btn op" @click="setOperator('×')">×</button>

          <!-- Row 3 -->
          <button class="btn" @click="inputDigit('4')">4</button>
          <button class="btn" @click="inputDigit('5')">5</button>
          <button class="btn" @click="inputDigit('6')">6</button>
          <button class="btn op" @click="setOperator('-')">−</button>

          <!-- Row 4 -->
          <button class="btn" @click="inputDigit('1')">1</button>
          <button class="btn" @click="inputDigit('2')">2</button>
          <button class="btn" @click="inputDigit('3')">3</button>
          <button class="btn op" @click="setOperator('+')">+</button>

          <!-- Row 5 -->
          <button class="btn col-span-2" @click="inputDigit('0')">0</button>
          <button class="btn" @click="inputDigit('.')">.</button>
          <button class="btn equals" @click="evaluate">=</button>
        </div>

        <div class="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-neutral-400">
          <span>Keys: 0-9 • . • + − × ÷ • % • Enter • Backspace • Esc</span>
          <span>Nuxt • Vue</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped> 
.cApp {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a{
  /* color: #333; */
  font-weight: bold;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
.btn {
  height: 3rem; /* h-12 */
  border-radius: 0.75rem; /* rounded-xl */
  font-size: 1.125rem; /* text-lg */
  font-weight: 500; /* font-medium */
  background-color: #f3f4f6; /* bg-gray-100 */
  color: #111827; /* text-gray-900 */
  transition: all 0.2s ease-in-out; /* transition */
}

.btn:hover {
  background-color: #e5e7eb; /* hover:bg-gray-200 */
}

.btn:active {
  transform: scale(0.98); /* active:scale-[0.98] */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .btn {
    background-color: #404040; /* dark:bg-neutral-700 */
    color: #ffffff; /* dark:text-white */
  }

  .btn:hover {
    background-color: #525252; /* dark:hover:bg-neutral-600 */
  }
}

/* .btn.muted */
.btn.muted {
  background-color: #e5e7eb; /* bg-gray-200 */
}

.btn.muted:hover {
  background-color: #d1d5db; /* hover:bg-gray-300 */
}

@media (prefers-color-scheme: dark) {
  .btn.muted {
    background-color: #525252; /* dark:bg-neutral-600 */
  }

  .btn.muted:hover {
    background-color: #737373; /* dark:hover:bg-neutral-500 */
  }
}

/* .btn.op */
.btn.op {
  background-color: #e0e7ff; /* bg-indigo-100 */
  color: #4338ca; /* text-indigo-700 */
}

.btn.op:hover {
  background-color: #c7d2fe; /* hover:bg-indigo-200 */
}

@media (prefers-color-scheme: dark) {
  .btn.op {
    background-color: rgba(49, 46, 129, 0.4); /* dark:bg-indigo-900/40 */
    color: #c7d2fe; /* dark:text-indigo-200 */
  }

  .btn.op:hover {
    background-color: rgba(49, 46, 129, 0.6); /* dark:hover:bg-indigo-900/60 */
  }
}

/* .btn.equals */
.btn.equals {
  background-color: #4f46e5; /* bg-indigo-600 */
  color: white; /* text-white */
}

.btn.equals:hover {
  background-color: #4338ca; /* hover:bg-indigo-700 */
}

@media (prefers-color-scheme: dark) {
  .btn.equals {
    background-color: #6366f1; /* dark:bg-indigo-500 */
  }

  .btn.equals:hover {
    background-color: #4f46e5; /* dark:hover:bg-indigo-600 */
  }
}

</style>