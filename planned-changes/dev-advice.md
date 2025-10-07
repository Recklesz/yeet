Yep — this is a known iOS-side hiccup with **Firestore’s gRPC pods**: Xcode can’t find `gRPC-Core.modulemap` (or `BoringSSL-GRPC.modulemap`). It’s most often triggered by **`use_modular_headers!`** or a stale/partial Pods cache. The same symptom is reported by React-Native-Firebase users and in gRPC’s tracker. ([GitHub][1])

Here’s the shortest path to green builds on Apple (works with RN 0.81.x + RNFirebase 23.x + Firebase Apple SDK 12.x):

# Fix that works most consistently (recommended)

1. **Podfile: use static frameworks; do NOT use global modular headers; disable Flipper.**

```ruby
platform :ios, '13.0'

$RNFirebaseAsStaticFramework = true
use_frameworks! :linkage => :static    # static frameworks for Firebase

# ⚠️ Remove / avoid: use_modular_headers!
# ⚠️ Disable Flipper – it conflicts with use_frameworks!
# use_flipper!()  # <- comment out if present

post_install do |installer|
  react_native_post_install(installer)
end
```

Why this helps: Firebase moved linkage control to the Podfile; they recommend **static frameworks**. Flipper and `use_frameworks!` don’t coexist, and RNFirebase also calls this out. ([Firebase][2])

2. **Nuke caches & reinstall Pods cleanly.**

```bash
cd ios
pod deintegrate
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod repo update
pod install --repo-update
```

This fixes broken header symlinks / stale modulemaps, which CocoaPods’ own troubleshooting guide recommends. ([CocoaPods Guides][3])

3. **Open the `.xcworkspace`** (not the `.xcodeproj`) and build.
   (Using the project file can surface “modulemap not found” errors when Pods aren’t wired in via the workspace.) ([CocoaPods Guides][3])

# If you *must* keep `use_modular_headers!`

Some teams can’t drop it. In that case, make gRPC pods opt-out of modular headers and (optionally) relax some build flags for them:

```ruby
use_modular_headers!

target 'YourApp' do
  # ...your pods (Firebase/Auth/Firestore/etc)...
  pod 'gRPC-C++', :modular_headers => false
  pod 'gRPC-Core', :modular_headers => false
  pod 'BoringSSL-GRPC', :modular_headers => false

  post_install do |installer|
    installer.pods_project.targets.each do |t|
      if ['gRPC-C++','gRPC-Core'].include?(t.name)
        t.build_configurations.each do |c|
          c.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
          c.build_settings['DEFINES_MODULE'] = 'NO'
        end
      end
    end
    react_native_post_install(installer)
  end
end
```

This workaround is what folks have used when `use_modular_headers!` causes the gRPC modulemap to go missing. (It’s been suggested in SO threads and mirrored in community issues.) ([Stack Overflow][4])

# Keep your toolchain aligned

* **Firebase Apple SDK:** stay current (as of **Sept 15, 2025**, line is **12.3.0**). If you’re pinned lower, update and re-install pods. ([Firebase][5])
* **Linkage mode:** Firebase’s doc explicitly shows using `use_frameworks! :linkage => :static`. ([Firebase][2])
* **Flipper:** leave it **disabled** with `use_frameworks!`; Flipper’s own docs say it won’t work with `use_frameworks!`. ([Flipper][6])

# Quick checklist to resolve your exact error

* [ ] Remove any **global `use_modular_headers!`** (or apply the gRPC opt-out workaround above). ([Stack Overflow][4])
* [ ] Use **`use_frameworks! :linkage => :static`** and set **`$RNFirebaseAsStaticFramework = true`**. ([Firebase][2])
* [ ] **Disable Flipper** in the Podfile. ([Flipper][6])
* [ ] **Deintegrate + reinstall Pods** and clear DerivedData. ([CocoaPods Guides][3])
* [ ] Build the **workspace**, not the project. ([CocoaPods Guides][3])

If you paste your current **Podfile** here, I’ll rewrite it to a known-good variant for your setup.

[1]: https://github.com/invertase/react-native-firebase/issues/7805?utm_source=chatgpt.com "ios/Pods/Headers/Private/grpc/gRPC-Core.modulemap' ..."
[2]: https://firebase.google.com/docs/ios/link-firebase-static-dynamic?utm_source=chatgpt.com "Link Firebase dependencies statically or dynamically"
[3]: https://guides.cocoapods.org/using/troubleshooting?utm_source=chatgpt.com "Troubleshooting"
[4]: https://stackoverflow.com/questions/59727138/firestore-installation-using-cocoapods?utm_source=chatgpt.com "ios - Firestore installation using Cocoapods"
[5]: https://firebase.google.com/support/release-notes/ios?utm_source=chatgpt.com "Firebase Apple SDK Release Notes"
[6]: https://fbflipper.com/docs/getting-started/react-native-ios/?utm_source=chatgpt.com "React Native - Manual iOS Setup - Flipper"
