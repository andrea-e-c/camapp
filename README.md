# camapp

The purpose of this app is to experiment with React Native, specifically within the ExpoGo space. The app is meant to simulate using a disposable camera. The user logs in, opens the camera, and snaps up to a certain amount of photos. When the camera is "out of photos", the user is prompted to have their images printed and shipped to them. To ensure users don't cheat and see their photos ahead of time, all images are stored on Firebase, and not locally on the user's device.

This app uses Google Firestore for user authentication, StripeAPI for payments, and PwintyAPI for photo printing.

Future updates include adding a film filter/effect to all images when they are captured so that they look better. This will require ejecting from the ExpoGo environment and using plain React Native. This update is currently in the works - be on the lookout for it!

Additionally, in the future users will have access to their images on their devices after they have received the physical copies. This will allow users to re-print if they wish.

Send other feature requests to Andrea Childress.
