# Delivery App

touch actionType.js action.js reducer.js selector.js

add to Pods
FBSDKCoreKit.framework
FBSDKLoginKit.framework
FBSDKShareKit.framework

## Code Push
appcenter codepush deployment list -a rocalilucas/Delivery-iOS --displayKeys
code-push deployment history rocalilucas/Delivery-iOS Production
### iOS
appcenter codepush release-react -a rocalilucas/Delivery-iOS -d Production

# TODO
- Placeholder on loading info
- Clean all info on logout
- Facebook release key
- M: Reload orders on new order

## possible issues 
- cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh
