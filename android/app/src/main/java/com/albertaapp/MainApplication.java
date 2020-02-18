package com.albertaapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.tradle.reactlocalauth.LocalAuthPackage;
import com.rnfingerprint.FingerprintAuthPackage;
// import com.learnium.RNDeviceInfo.RNDeviceInfo;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LocalAuthPackage(),
            new FingerprintAuthPackage(),
            // new RNDeviceInfo(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNCWebViewPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new SnackbarPackage(),
            new OrientationPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new RNCardViewPackage(),
            new RNCameraPackage(),
            new ReactNativeYouTube()
           
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
