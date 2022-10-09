import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    ScreenSizeType,
    BreakpointType,
    DeviceType,
    OrientationType,
} from './responsive.enum';

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    constructor(breakpointObserver: BreakpointObserver) {
        this.checkScreenSize(breakpointObserver);

        this.checkDeviceTypeAndOrientation(breakpointObserver);
    }

    private _screenSize = ScreenSizeType.Unknown;
    get screenSize(): ScreenSizeType {
        return this._screenSize;
    }
    private set screenSize(value: ScreenSizeType) {
        this._screenSize = value;
    }

    private readonly screenSizeBreakpoints = new Map([
        [Breakpoints.XSmall, ScreenSizeType.XSmall],
        [Breakpoints.Small, ScreenSizeType.Small],
        [Breakpoints.Medium, ScreenSizeType.Medium],
        [Breakpoints.Large, ScreenSizeType.Large],
        [Breakpoints.XLarge, ScreenSizeType.XLarge],
    ]);

    private checkScreenSize(breakpointObserver: BreakpointObserver): void {
        breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        this.screenSize =
                            this.screenSizeBreakpoints.get(query) ??
                            ScreenSizeType.Unknown;
                    }
                }
            });
    }

    private _orientation = OrientationType.Unknown;
    public get orientation(): OrientationType {
        return this._orientation;
    }
    private set orientation(value: OrientationType) {
        this._orientation = value;
    }

    public orientationPortrait(): boolean {
        return this._orientation === OrientationType.Portrait;
    }
    public orientationLandscape(): boolean {
        return this._orientation === OrientationType.Landscape;
    }

    public deviceDesktop(): boolean {
        return this._deviceType === DeviceType.Web;
    }
    public deviceTablet(): boolean {
        return this._deviceType === DeviceType.Tablet;
    }
    public deviceMobile(): boolean {
        return this._deviceType === DeviceType.Handset;
    }

    private _deviceType = DeviceType.Unknown;
    get deviceType(): DeviceType {
        return this._deviceType;
    }
    private set deviceType(value: DeviceType) {
        this._deviceType = value;
    }

    private readonly deviceAndOrientation = new Map([
        [Breakpoints.HandsetLandscape, BreakpointType.HandsetLandscape],
        [Breakpoints.HandsetPortrait, BreakpointType.HandsetPortrait],

        [Breakpoints.TabletLandscape, BreakpointType.TabletLandscape],
        [Breakpoints.TabletPortrait, BreakpointType.TabletPortrait],

        [Breakpoints.WebLandscape, BreakpointType.WebLandscape],
        [Breakpoints.WebPortrait, BreakpointType.WebPortrait],
    ]);

    private checkDeviceTypeAndOrientation(
        breakpointObserver: BreakpointObserver
    ): void {
        breakpointObserver
            .observe([
                Breakpoints.HandsetLandscape,
                Breakpoints.HandsetPortrait,

                Breakpoints.WebLandscape,
                Breakpoints.WebPortrait,

                Breakpoints.TabletLandscape,
                Breakpoints.TabletPortrait,
            ])
            .subscribe((result) => {
                let orientationTypes = Object.keys(OrientationType).map(
                    (key) => key
                );

                let deviceTypes = Object.keys(DeviceType).map((key) => key);

                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        let type =
                            this.deviceAndOrientation.get(query) ??
                            BreakpointType.Unknown;

                        orientationTypes.forEach((element) => {
                            if (type.indexOf(element) !== -1) {
                                this.orientation = element as OrientationType;
                            }
                        });

                        deviceTypes.forEach((element) => {
                            if (type.indexOf(element) !== -1) {
                                this.deviceType = element as DeviceType;
                            }
                        });
                    }
                }
            });
    }
}
