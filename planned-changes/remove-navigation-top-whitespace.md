---
description: remove extra top whitespace above tab screens
---

# Context
- **Observation**: Extra white band sits above tab content, especially noticeable on `app/(tabs)/index.tsx` with `CustomHeader`.
- **Probable cause**: `SafeAreaScreen` applies top safe-area padding while `CustomHeader` also adds `paddingTop: insets.top`, effectively doubling the top inset.

# Goals
- **Trim padding**: Eliminate redundant top padding so headers sit flush against the status bar.
- **Preserve coverage**: Keep dark header backgrounds covering the notch/status area.
- **Maintain consistency**: Ensure other screens like `app/(tabs)/practice.tsx` still behave correctly.

# Proposed Changes
- **Audit `SafeAreaScreen` usage**: Confirm screens that render custom headers opt out of the default top edge by passing `edges` without `'top'`.
- **Update header screens**: Adjust `HomeScreen` and any similar screens to pass `edges={['left','right','bottom']}` and rely on their own inset handling.
- **Fallback styling**: If other screens rely on the default top inset, leave them unchanged or add localized padding as needed.
- **Validation**: Run the app on iOS simulator to verify the top gap is gone and there are no notch regressions.

# Follow-ups / Questions
- **Other contributors?** `ScrollView` instances sometimes add `paddingTop`; confirm no additional adjustments are needed there.
- **Design confirmation**: Double-check with design whether any residual spacing is intentional before coding the change.
