# &lt; ContentTransition &gt;

State machine that allows control content transitions in an easiest way.

## Description

Component `<ContentTransition>` is doing the same what doing [&lt; Transition &gt;](Transition.md) component,
only difference that `<ContentTransition>` removes inner content if `direction` is `DIRECTION_EXIT` and `status` is `STATUS_DONE`.

## Props

`<ContentTransition>` has all props of [&lt; Transition &gt;](Transition.md) component and also:

#### display: bool

A flag that renders content on first mount.

Default: `true`

#### keepContentMounted: bool

A flag that does not allow remove inner content if `direction` is `DIRECTION_EXIT` and `status` is `STATUS_DONE`.

Default: `true`
