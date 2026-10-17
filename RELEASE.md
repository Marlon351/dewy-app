# Releasing Dewy

Everything in the code is set up for release. These are the steps that need your accounts, secrets, or uploads, in order.

## 1. Deploy the backend (Render)

1. **MongoDB Atlas:** under Network Access, allow connections from Render (`0.0.0.0/0`, or Render's static outbound IPs on paid plans). Use a database user with access only to the Dewy database.
2. **Gmail App Password:** turn on 2-Step Verification for the sending Gmail account, then create an App Password (Google Account → Security → App passwords). This goes in `EMAIL_PASSWORD`. Your local `backend/.env` needs it too, because the server won't start without it.
3. **Push the repo to GitHub**, then in Render: **New → Blueprint** and pick the repo. `render.yaml` creates the `dewy-api` service and asks for the secrets:
   - `DATABASE`, `DATABASE_PASSWORD`: your Atlas connection string and password
   - `JWT_SECRET`: a new random value (see `backend/.env.example` for the command). Don't reuse your local one.
   - `ENCRYPTION_KEY`: a new 64-character hex key for production. **Store a copy in a password manager.** If it's lost, everyone's encrypted routines and notes become unreadable.
   - `EMAIL_USERNAME`, `EMAIL_PASSWORD`: the Gmail address and App Password
4. Check that these open in a browser:
   - `https://dewy-api.onrender.com/health`
   - `https://dewy-api.onrender.com/privacy`
   - `https://dewy-api.onrender.com/terms`
5. If Render gives you a different URL (because `dewy-api` was taken), update `PRODUCTION_API_URL` in `mobile/api/client.js`.

Use the paid **Starter** plan in `render.yaml`. The free plan sleeps after inactivity, so the first request after a while takes about 50 seconds, and App Review may reject the app as unresponsive.

## 2. iOS (App Store)

1. In the Apple Developer portal, register the bundle ID **`com.marlonrodriguez.dewy`**.
2. In App Store Connect, create the app with that bundle ID.
3. In Xcode: open `mobile/ios/mobile.xcworkspace`, select the **mobile** target → Signing & Capabilities, and check that your team is selected. Set the scheme to **Any iOS Device**, then Product → **Archive** → Distribute App → App Store Connect.
4. Fill in the listing (copy below), upload screenshots, and answer **App Privacy** using the answers below.
5. Under **App Review Information**, give Apple a **demo account** (email and password) with a routine and a few days of progress. Apple rejects apps that require login without one.

The marketing version is `1.0.0` and the build number is `1`. Increase the build number for every upload.

## 3. Android (Google Play)

1. Generate an upload key once, and keep it safe (back it up outside the repo):
   ```sh
   keytool -genkeypair -v -storetype PKCS12 -keystore dewy-upload.keystore -alias dewy-upload -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Move the keystore to `mobile/android/app/` (`*.keystore` files are gitignored), then add this to `~/.gradle/gradle.properties` (not the project's copy):
   ```
   DEWY_UPLOAD_STORE_FILE=dewy-upload.keystore
   DEWY_UPLOAD_STORE_PASSWORD=...
   DEWY_UPLOAD_KEY_ALIAS=dewy-upload
   DEWY_UPLOAD_KEY_PASSWORD=...
   ```
3. Build the bundle: `cd mobile/android && ./gradlew bundleRelease`. The output is `app/build/outputs/bundle/release/app-release.aab`.
4. In Play Console, create the app, enroll in Play App Signing, upload the `.aab`, and complete **Data safety** using the answers below. Add the privacy policy URL and the same demo account under App access.

The package name is `com.marlonrodriguez.dewy` and the version is `1.0.0` (versionCode `1`). Increase `versionCode` for every upload.

## Store listing

- **Name:** Dewy
- **Subtitle (iOS, 30 chars):** Skincare routine & tracker
- **Short description (Play, 80 chars):** Build your AM/PM skincare routine, check off steps, and keep your glow streak.
- **Category:** Health & Fitness (or Lifestyle)
- **Keywords (iOS):** skincare,routine,skin care,tracker,glass skin,retinol,sunscreen,habit,streak,self care
- **Privacy Policy URL:** https://dewy-api.onrender.com/privacy
- **Support URL:** https://dewy-api.onrender.com/privacy (or a support page if you make one)

**Description:**

> Dewy makes it easy to build a skincare routine you'll actually stick to.
>
> BUILD YOUR ROUTINE
> Create morning and evening routines step by step. Add your products and choose which days each step runs, like retinol on Monday, Wednesday and Friday.
>
> CHECK IT OFF
> Each day, tick off your steps as you go. Watch your progress fill up and celebrate when your routine is done.
>
> STAY CONSISTENT
> Build a streak, beat your best, and see your whole week at a glance.
>
> SEE YOUR PROGRESS
> A monthly calendar shows every complete day. Log how your skin feels each day and add notes about breakouts, reactions or new products.
>
> PRIVATE BY DESIGN
> Your routine, ratings and notes are encrypted, never sold, and never used for ads. Delete your account and data anytime.
>
> Dewy is a tracking tool, not medical advice. Talk to a dermatologist about any skin concern.

**Screenshots:** iPhone 6.9" (1320 × 2868) is required, and Play needs at least 2 phone screenshots. Good screens to show: Home (streak and today's checklist), Routine, Calendar, and the skin check-in.

## Privacy answers

These match what the app actually does (see `backend/public/privacy.html`).

**App Store → App Privacy:** data collected, linked to the user, **not** used for tracking:
- **Contact Info → Name, Email Address:** used for App Functionality
- **Health & Fitness → Health:** the skin ratings and notes, used for App Functionality
- **User Content → Other User Content:** routine steps and products, used for App Functionality

**Play Console → Data safety:**
- Collects **Name, Email address** (Personal info), **Health info** (skin ratings and notes), and **Other user-generated content** (routine). All are required for app functionality and none are shared.
- Data is encrypted in transit: **Yes**
- Users can request deletion: **Yes**, in the app under Account → Delete Account

**Age rating:** no objectionable content. Answer "No" to every content question; the result is 4+ on iOS and Everyone on Play.
