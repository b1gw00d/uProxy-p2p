/**
 * core.d.ts
 *
 * Core interfaces for communication between the UI and uproxy core.
 * In the 'dependencies' file for any particular platform, there must be
 * platform-specific implementations.
 */

declare module Core {
  // declare var onCommand: (cmd :uProxy.Command, handler:any) => void;
}

declare module uProxy {

  // TODO: Remove this once we use the newer consent piece.
  module Consent {
    enum Action {
      REQUEST,
      CANCEL,
      ACCEPT,
      DECLINE,
      OFFER,
      ALLOW,
      DENY,
    }
  }

  export interface CoreAPI {
    // Connection handlers between Core and UI
    onConnected():void;
    onDisconnected():void;

    // Clears all state and storage.
    reset():void;

    // Send your own instanceId to target clientId.
    sendInstance(clientId:string):void;

    modifyConsent(id:string, action:Consent.Action):void;

    // Consent
    // TODO clean this
    // requestAccess(instanceId : string) : void;
    // cancelRequest(instanceId : string) : void;
    // acceptOffer(instanceId : string) : void;
    // declineOffer(instanceId : string) : void;
    // offer(instanceId : string) : void;
    // allow(instanceId : string) : void;
    // deny(instanceId : string) : void;
    // revoke(instanceId : string) : void;

    // Using peer as a proxy.
    start(instanceId:string):void;
    stop(instanceId:string):void;

    updateDescription(description:string):void;
    changeOption(option:string):void;

    // TODO: improve the notifications feature
    notificationSeen(userId:string):void;

    // TODO: make network an actual type
    login(network:string):void;
    logout(network:string):void;
  }

  interface ICoreOptions {
    allowNonroutableAddresses(enabled:boolean):void;
    setStunServers(servers:string[]):void;
    setTurnServers(servers:string[]):void;
  }

}
