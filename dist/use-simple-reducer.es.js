import { useRef as l, useEffect as M, useCallback as b, useState as j } from "react";
const y = () => {
  const t = l(!0);
  return M(() => () => {
    t.current = !1;
  }, []), b((c) => {
    t.current && c && c();
  }, []);
};
function O(t) {
  return t && Object.prototype.toString.call(t) === "[object Promise]";
}
function E(t, i, c = j) {
  M(() => {
    O(t) && t.then((n) => {
      p(n), f.current = n;
    });
  }, []);
  const [g, p] = c(t), [o, s] = c({ isActive: !1, runningAction: null, pendingActions: [] }), [P, h] = c(null), { current: e } = l([]), m = y(), u = l(!1), f = l(g), v = {};
  for (const n in i)
    Object.prototype.hasOwnProperty.call(i, n) && (v[n] = (...r) => {
      e.push({
        actionName: n,
        action: i[n],
        args: r
      }), s({ ...o, pendingActions: [...e] }), u.current || (u.current = !0, A());
    });
  function A() {
    const n = e.shift();
    n !== void 0 ? (s({ ...o, isActive: !0, runningAction: n, pendingActions: [...e] }), n.action(f.current, ...n.args).then((r) => {
      m(() => {
        f.current = r, h(null), p(r), A();
      });
    }).catch((r) => {
      m(() => {
        const a = [...e];
        e.splice(0, e.length), u.current = !1, s({ ...o, isActive: !1, runningAction: null, pendingActions: [] }), h({
          reason: r,
          failedAction: n,
          pendingActions: a,
          runFailedAction: () => d([n]),
          runPendingActions: () => d(a),
          runAllActions: () => d([n, ...a])
        });
      });
    })) : (u.current = !1, s({ ...o, isActive: !1, runningAction: null, pendingActions: [] }));
  }
  function d(n) {
    e.push(...n), A();
  }
  return [g, v, o, P];
}
export {
  E as useSimpleReducer
};
