(ns adventofcode.day10
  (:require [clojure.string :as str]))

(defn say
  [saying]
  (let [digits (partition-by identity saying)]
    (->> digits
         (map (fn [d] (vector (count d) (first d))))
         (apply concat)
         (apply str))))

(defn look-and-say
  [start howmany]
  (loop [counter howmany
         saying start]
    (if (zero? counter)
      (count saying)
      (let [spoken (say saying)]
        (recur (dec counter) spoken)))))

(defn solve
  "..."
  [& args]
  (let [in (->> "resources/day10input" slurp str/trim-newline)]

    ;; Part 1
    (println (look-and-say in 40))

    ;; Part 2
    (println (look-and-say in 50))

    ))

