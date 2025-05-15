console.log('⚙️', 'BLIPPAR INITIALISATION')

// Load scene using URL params
// sample URL: https://workspace.8thwall.app/vps-beta/?scene=detect-mesh
const params = new URLSearchParams(document.location.search.substring(1))
const sceneName = params.get('scene') ? params.get('scene') : 'marker-scene'
console.log('sceneName = ', sceneName)

const updateResetButton = () => {
  const resetButton = document.getElementById('resetButton')
  if (resetButton) {
    const resetButtonImage = resetButton.firstElementChild
    if (resetButtonImage) resetButtonImage.style.display = 'block'
  }
}

// Load scene content
fetch(`../scenes/${sceneName}.html`)
  .then((response) => response.text())
  .then((html) => {
    document.querySelector('a-scene').innerHTML = html

    WEBARSDK.Init()

    // if (sceneName.includes('marker')) {
    //   console.log('webar-mode = ', 'marker-tracking')
    //   WEBARSDK.SetWebARMode('marker-tracking')
    // }

    // Give a callback when the WebAR Stage <a-entity webar-stage> is ready  to display the 3d object
    WEBARSDK.SetStageReadyCallback(() => {
      console.info('Stage is ready now!!!')

      // Fix resetButton icon when loading scene dynamically
      updateResetButton()
    })

    WEBARSDK.SetGuideViewCallbacks(
      (startGuideViewCallback = () => {
        console.log(' Start(ed) hand guide animation')
      }),
      (stopGuideViewCallback = () => {
        console.log(' Stop(ped) hand guide animation')
      })
    )

    WEBARSDK.SetPrepareForCameraTransitionCallback(() => {
      deskenv.parentNode.removeChild(deskenv)
    })

    // Give a callback when the WebAR Marker <a-entity webar-marker> is ready  to track the marker image
    WEBARSDK.SetMarkerDetectedCallback((markerId) => {
      console.info('Marker is detected for marker id: ', markerId)
    })

    // Give a callback when the WebAR Marker <a-entity webar-marker> is lost
    WEBARSDK.SetMarkerLostCallback((markerId) => {
      console.info('Marker tracking is lost for marker id: ', markerId)
    })
  })
  .catch((error) => {
    console.error('Error loading scene:', error)
  })
