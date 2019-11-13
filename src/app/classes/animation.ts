import {
    transition,
    trigger,
    style,
    query,
    animateChild,
    group,
    animate,
    state
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%'
                })
            ],
            { optional: true }
        ),
        query(':enter', [style({ right: '-100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(
                ':leave',
                [animate('300ms ease-out', style({ right: '100%' }))],
                { optional: true }
            ),
            query(
                ':enter',
                [animate('300ms ease-out', style({ right: '0%' }))],
                { optional: true }
            )
        ]),
        query(':enter', animateChild(), { optional: true })
    ])
]);
export const shrinkOutAnimation = trigger('shrinkOut', [
    state('in', style({ height: '*' })),
    transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
    ])
]);
