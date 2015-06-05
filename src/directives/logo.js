import angular from 'angular';

const template = `
<g id="Layer_1">
  <g>
    <path fill="#F3B534" d="M14.1,300.069v-4.341c2.601,1.14,4.826,1.709,6.675,1.709c1.295,0,2.315-0.302,3.06-0.906
      c0.745-0.604,1.118-1.424,1.118-2.461c0-0.82-0.234-1.513-0.702-2.076c-0.468-0.564-1.355-1.233-2.661-2.008l-1.616-0.94
      c-2.165-1.276-3.694-2.498-4.586-3.666c-0.892-1.167-1.338-2.532-1.338-4.093c0-2.085,0.731-3.76,2.195-5.024
      c1.463-1.265,3.397-1.897,5.802-1.897c1.926,0,4.097,0.291,6.512,0.872v4.05c-2.47-0.968-4.423-1.453-5.859-1.453
      c-1.11,0-1.999,0.259-2.668,0.777c-0.669,0.519-1.003,1.2-1.003,2.042c0,0.695,0.234,1.305,0.702,1.829
      c0.468,0.524,1.349,1.168,2.644,1.931l1.73,1.008c2.328,1.367,3.933,2.626,4.814,3.777c0.881,1.151,1.322,2.552,1.322,4.204
      c0,2.347-0.833,4.187-2.497,5.52c-1.665,1.333-3.961,2-6.888,2C18.921,300.924,16.668,300.639,14.1,300.069z"/>
    <path fill="#F3B534" d="M42.372,300.291v-26.985h4.831v11.758c1.578-2.643,3.612-3.965,6.104-3.965c1.6,0,2.862,0.53,3.787,1.589
      s1.387,2.507,1.387,4.341v13.262H53.65v-12.014c0-2.13-0.675-3.196-2.023-3.196c-1.534,0-3.009,1.134-4.423,3.401v11.809H42.372z"
      />
    <path fill="#F3B534" d="M72.145,278.365v-4.221h4.831v4.221H72.145z M72.145,300.291v-18.765h4.831v18.765H72.145z"/>
    <path fill="#F3B534" d="M90.836,300.291v-18.765h4.831v3.538c1.578-2.643,3.612-3.965,6.104-3.965c1.6,0,2.862,0.53,3.787,1.589
      s1.387,2.507,1.387,4.341v13.262h-4.831v-12.014c0-2.13-0.675-3.196-2.023-3.196c-1.534,0-3.009,1.134-4.423,3.401v11.809H90.836z
      "/>
    <path fill="#F3B534" d="M120.136,299.693v-3.708c2.394,1.048,4.439,1.572,6.137,1.572c1.98,0,2.97-0.706,2.97-2.119
      c0-0.911-0.816-1.709-2.448-2.393l-1.632-0.684c-1.773-0.752-3.041-1.561-3.803-2.427c-0.762-0.866-1.143-1.937-1.143-3.213
      c0-1.777,0.647-3.159,1.942-4.145c1.295-0.985,3.106-1.478,5.435-1.478c1.458,0,3.193,0.222,5.206,0.667v3.555
      c-1.937-0.706-3.542-1.06-4.814-1.06c-2.002,0-3.003,0.649-3.003,1.948c0,0.854,0.74,1.578,2.219,2.17l1.404,0.564
      c2.1,0.832,3.561,1.675,4.382,2.529c0.822,0.854,1.232,1.954,1.232,3.298c0,1.766-0.699,3.199-2.097,4.298
      c-1.398,1.1-3.218,1.649-5.459,1.649C124.51,300.719,122.333,300.377,120.136,299.693z"/>
    <path fill="#F3B534" d="M161.921,299.659c-2.296,0.706-4.472,1.06-6.528,1.06c-2.993,0-5.354-0.889-7.083-2.666
      s-2.595-4.204-2.595-7.28c0-2.905,0.792-5.244,2.375-7.015s3.675-2.658,6.275-2.658c2.622,0,4.537,0.866,5.745,2.598
      c1.208,1.732,1.812,4.472,1.812,8.22h-11.115c0.327,3.578,2.204,5.366,5.631,5.366c1.621,0,3.449-0.393,5.484-1.179V299.659z
      M150.741,289.063h6.431c0-3.201-0.985-4.802-2.954-4.802C152.215,284.261,151.056,285.862,150.741,289.063z"/>
    <path fill="#F3B534" d="M174.737,300.291v-26.985h4.831v16.97h0.31l6.382-8.75h4.015l-5.892,8.032l7.736,10.732h-5.875
      l-6.365-9.382h-0.31v9.382H174.737z"/>
    <path fill="#F3B534" d="M212.49,298.275c-1.61,1.629-3.335,2.444-5.173,2.444c-1.567,0-2.84-0.501-3.819-1.504
      c-0.979-1.002-1.469-2.301-1.469-3.896c0-2.073,0.792-3.671,2.375-4.793s3.849-1.684,6.798-1.684h1.289v-1.709
      c0-1.948-1.061-2.922-3.183-2.922c-1.882,0-3.786,0.559-5.712,1.675v-3.486c2.187-0.866,4.352-1.299,6.496-1.299
      c4.689,0,7.034,1.954,7.034,5.862v8.306c0,1.47,0.451,2.205,1.354,2.205c0.164,0,0.375-0.022,0.637-0.068l0.114,2.837
      c-1.023,0.319-1.926,0.479-2.709,0.479c-1.98,0-3.253-0.814-3.819-2.444H212.49z M212.49,295.557v-3.811h-1.142
      c-3.123,0-4.684,1.025-4.684,3.076c0,0.695,0.226,1.279,0.677,1.752c0.451,0.473,1.009,0.709,1.673,0.709
      C210.145,297.284,211.304,296.708,212.49,295.557z"/>
    <path fill="#F3B534" d="M231.182,278.365v-4.221h4.831v4.221H231.182z M231.182,300.291v-18.765h4.831v18.765H231.182z"/>
  </g>
  <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="125.0101" y1="257.9332" x2="125.0101" y2="9.9778">
    <stop  offset="0" style="stop-color:#FBD071"/>
    <stop  offset="0.2618" style="stop-color:#FBA516"/>
  </linearGradient>
  <polygon fill="url(#SVGID_1_)" points="159.278,199.395 138.1,199.395 133.1,78.513 133.1,52.334 138.1,26.158 130.01,9.978
    120.01,9.978 111.92,26.158 116.92,52.334 116.92,78.513 111.92,199.395 90.742,199.395 103.831,215.575 90.742,257.933
    100.742,257.933 116.92,225.575 133.1,225.575 149.278,257.933 159.278,257.933 146.189,215.575   "/>
  <path fill="#FBA516" d="M103.1,69.576l10-7.177v2.241l-8.07,5.759v0.114l8.07,5.759v2.242l-10-7.178V69.576z"/>
  <path fill="#FBA516" d="M146.92,71.335l-10,7.178v-2.242l8.07-5.759v-0.114l-8.07-5.759v-2.241l10,7.177V71.335z"/>
  <g>
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="29.1186" y1="215.5735" x2="29.1186" y2="173.2155">
      <stop  offset="0" style="stop-color:#9348FA"/>
      <stop  offset="0.0602" style="stop-color:#A04EF6"/>
      <stop  offset="0.2389" style="stop-color:#C25EEA"/>
      <stop  offset="0.4213" style="stop-color:#DD6BE1"/>
      <stop  offset="0.6068" style="stop-color:#F074DB"/>
      <stop  offset="0.7972" style="stop-color:#FB79D7"/>
      <stop  offset="1" style="stop-color:#FF7BD6"/>
    </linearGradient>
    <circle fill="url(#SVGID_2_)" cx="29.119" cy="194.395" r="21.179"/>
    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="45.6611" y1="176.8809" x2="45.6611" y2="199.3934">
      <stop  offset="0" style="stop-color:#E93400"/>
      <stop  offset="1" style="stop-color:#F4AC0B"/>
    </linearGradient>
    <path fill="url(#SVGID_3_)" d="M41.025,176.881v22.513h8.655c0.389-1.606,0.618-3.274,0.618-4.999
      C50.298,187.113,46.621,180.693,41.025,176.881z"/>
    <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="49.1146" y1="130.8607" x2="49.1146" y2="199.3934">
      <stop  offset="0" style="stop-color:#FDBE57"/>
      <stop  offset="0.3618" style="stop-color:#E3242B"/>
      <stop  offset="1" style="stop-color:#751056"/>
    </linearGradient>
    <path fill="url(#SVGID_4_)" d="M41.025,130.861v46.02c5.596,3.812,9.273,10.232,9.273,17.514c0,1.725-0.229,3.393-0.618,4.999
      h7.525v-68.533H41.025z"/>
  </g>
  <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="218.9909" y1="225.5732" x2="218.9909" y2="140.8571">
    <stop  offset="0" style="stop-color:#54E5D4"/>
    <stop  offset="1" style="stop-color:#2A78FF"/>
  </linearGradient>
  <rect x="205.901" y="140.857" fill="url(#SVGID_5_)" width="26.179" height="84.716"/>
  <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="185.4516" y1="189.3962" x2="185.4516" y2="104.6809">
    <stop  offset="0" style="stop-color:#94EA35"/>
    <stop  offset="0.2714" style="stop-color:#BBEC36"/>
    <stop  offset="0.5376" style="stop-color:#DAEE37"/>
    <stop  offset="0.6853" style="stop-color:#E6EF37"/>
    <stop  offset="0.8824" style="stop-color:#F8D554"/>
    <stop  offset="1" style="stop-color:#FFCB60"/>
  </linearGradient>
  <rect x="177.362" y="104.681" fill="url(#SVGID_6_)" width="16.18" height="84.715"/>
  <g>
    <g>
      <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="108.5003" x2="74.5651" y2="98.5003">
        <stop  offset="0" style="stop-color:#54E5D4"/>
        <stop  offset="1" style="stop-color:#E2E900"/>
      </linearGradient>
      <circle fill="url(#SVGID_7_)" cx="74.565" cy="103.5" r="5"/>
      <linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="124.6807" x2="74.5651" y2="114.6807">
        <stop  offset="0" style="stop-color:#54E5D4"/>
        <stop  offset="1" style="stop-color:#E2E900"/>
      </linearGradient>
      <circle fill="url(#SVGID_8_)" cx="74.565" cy="119.681" r="5"/>
      <defs>
        <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="69.565" y="130.861" width="10" height="10">
          <feFlood  style="flood-color:white;flood-opacity:1" result="back"/>
          <feBlend  in="SourceGraphic" in2="back" mode="normal"/>
        </filter>
      </defs>
      <mask maskUnits="userSpaceOnUse" x="69.565" y="130.861" width="10" height="10" id="SVGID_9_">
        <g filter="url(#Adobe_OpacityMaskFilter)">
        </g>
      </mask>
      <linearGradient id="SVGID_10_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="130.8611">
        <stop  offset="0" style="stop-color:#54E5D4"/>
        <stop  offset="1" style="stop-color:#E2E900"/>
      </linearGradient>
      <circle mask="url(#SVGID_9_)" fill="url(#SVGID_10_)" cx="74.565" cy="135.861" r="5"/>
    </g>
    <g>
      <linearGradient id="SVGID_11_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">
        <stop  offset="0" style="stop-color:#FDD53F"/>
        <stop  offset="0.49" style="stop-color:#ACDF43"/>
        <stop  offset="0.8055" style="stop-color:#74E39F"/>
        <stop  offset="1" style="stop-color:#54E5D4"/>
      </linearGradient>
      <circle fill="url(#SVGID_11_)" cx="74.565" cy="103.5" r="5"/>
      <linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">
        <stop  offset="0" style="stop-color:#FDD53F"/>
        <stop  offset="0.49" style="stop-color:#ACDF43"/>
        <stop  offset="0.8055" style="stop-color:#74E39F"/>
        <stop  offset="1" style="stop-color:#54E5D4"/>
      </linearGradient>
      <circle fill="url(#SVGID_12_)" cx="74.565" cy="119.681" r="5"/>
      <linearGradient id="SVGID_13_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">
        <stop  offset="0" style="stop-color:#FDD53F"/>
        <stop  offset="0.49" style="stop-color:#ACDF43"/>
        <stop  offset="0.8055" style="stop-color:#74E39F"/>
        <stop  offset="1" style="stop-color:#54E5D4"/>
      </linearGradient>
      <circle fill="url(#SVGID_13_)" cx="74.565" cy="135.861" r="5"/>
    </g>
  </g>
</g>
<g id="Layer_2">
  <rect fill="#FFFFFF" width="1" height="1"/>
  <rect x="249" y="308" fill="#FFFFFF" width="1" height="1"/>
</g>
`;

const moduleName = 'shinsekai.directives.logo';

angular.module(moduleName, []).directive('ssLogo', [() => {
  return {
    restrict: 'A',
    template: template
  };
}]);

export default moduleName;
