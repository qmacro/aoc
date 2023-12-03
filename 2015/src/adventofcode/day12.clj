(ns adventofcode.day12
  (:require [clojure.string :as str]))


(defn has-red? [m]
  (some (fn [me] ((set me) "red")) m))

(defn tot-no-red
  [string]
  (as-> string a
    (clojure.string/replace a ":" " ")
    (read-string a)           
    (clojure.walk/prewalk #(cond
                (and (map? %) (has-red? %)) nil
                (map? %) (seq %)
                :else %) a)
    (flatten a)
    (filter integer? a)
    (reduce + a)))

(defn solve
  "..."
  [& args]
  (let [in (->> "resources/day12input" slurp str/trim-newline)]

    ;; Part 1
    (println (->> in
                  (re-seq #"(-?\d+)") ;; find all number strings
                  (map #(Integer. (first %))) ;; convert them
                  (reduce +))) ;; then add them together

    ;; Part 2
    ;; (Had to look for some help on clojure.walk here)
    (println (tot-no-red in))

    ))



