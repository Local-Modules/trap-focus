# @locmod/trap-focus

## Installation

```
npm i @locmod/trap-focus --save
```

## Usage

```
import { useTrapFocus } from '@locmod/trap-focus'

const Component = () => {
  const ref = useTrapFocus()
  
  return (
    <div 
      ref={ref}
      tabIndex={0} // don't forget to add this
    >
      ...
    </div>
  )
}
```

Or manually

```
import TrapFocus from '@locmod/trap-focus'

const Component = () => {
  const ref = useRef()
  
  useEffect(() => {
    const trapFocus = new TrapFocus(ref.current)
  
    trapFocus.mount()
  
    return () => {
      trapFocus.unmount()
    }
  }, [ trapFocusId ])
  
  return (
    <div 
      ref={ref}
      tabIndex={0} // don't forget to add this
    >
      ...
    </div>
  )
}
```

### Options

There is only one option `withInitialFocus: Boolean`. Default is `True`. 

`True` means that when `trapFocus.mount()` called first element from the selectors list will be focused.

**selectors list:**

```
a[href]:not([disabled]), 
button:not([disabled]), 
input[type="text"]:not([disabled]),
input[type="radio"]:not([disabled]), 
input[type="checkbox"]:not([disabled]), 
textarea:not([disabled]), 
select:not([disabled]),
div[role="button"]:not([disabled])
```

`False` means that the lib won't be looking for elements to focus.


```
useTrapFocus({ withInitialFocus: false })

new TrapFocus(ref.current, { withInitialFocus: false })
```
