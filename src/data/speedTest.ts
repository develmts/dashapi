// This example shows how to configure the library.
import { UniversalSpeedTest, DistanceUnits } from "universal-speedtest";


export async function run(){
  const universalSpeedTest = new UniversalSpeedTest({
    debug: false,
    tests: {
      measureUpload: true,
      measureDownload: true
    },
    units: {
      distanceUnit: DistanceUnits.km
    }
  });
  const testResult = await universalSpeedTest.performOoklaTest();
  return testResult
}


