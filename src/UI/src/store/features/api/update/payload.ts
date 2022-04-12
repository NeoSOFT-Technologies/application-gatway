import { IApiGetByIdState } from ".";

export const initialState: IApiGetByIdState = {
  data: {
    form: {
      ApiId: "",
      Name: "",
      ListenPath: "",
      StripListenPath: false,
      TargetUrl: "",
      IsActive: true,
      IsInternal: false,
      Protocol: "",
      RateLimit: {
        Rate: 0,
        Per: 0,
        IsDisabled: false,
      },
      Blacklist: [],
      Whitelist: [],
      VersioningInfo: {
        Location: "",
        Key: "",
      },
      IsVersioningDisabled: true,
      DefaultVersion: "",
      Versions: [
        {
          Name: "",
          OverrideTarget: "",
          Expires: "",
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: null,
        },
      ],
      AuthType: "",
      OpenidOptions: {
        Providers: [],
      },
      LoadBalancingTargets: [],
      IsQuotaDisabled: false,
    },
    errors: {
      ApiId: "",
      Name: "",
      ListenPath: "",
      stripListenPath: "",
      TargetUrl: "",
      isActive: "",
      Rate: "",
      Per: "",
      versioningInfo: "",
      defaultVersion: "",
      version: "",
      isQuotaDisabled: "",
      OverrideTarget: "",
    },
  },
  loading: false,
  error: null,
};
